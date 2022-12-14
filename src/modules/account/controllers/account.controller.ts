import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { MovementCreateDto } from '../../movement/dto/movement.create.dto';
import { MovementEntity } from '../../../common/postgres/entities/movement.entity';
import { ClientService } from '../../../modules/client/services/client.service';
import { AccountEmailPaymentDto } from '../dto/account.Email.payment.dto';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private clientService: ClientService,
  ) {}

  @Get(':id')
  getAccountById(@Param('id') id: string) {
    return this.accountService.getAccountInfo(id);
  }
  @Post('loan')
  //@UseGuards(TokenGuard)
  createLoan(@Body() loan: MovementCreateDto): Promise<MovementEntity> {
    return this.accountService.newLoan(loan);
  }
  @Post('payment')
  //@UseGuards(TokenGuard)
  async createPayment(
    @Body() data: AccountEmailPaymentDto,
  ): Promise<MovementEntity> {
    try {
      const cliIncome = await this.clientService.getClientByEmail(
        data.emailIncome,
      );
      const accIncome = await this.accountService.getAccountInfo(cliIncome.id);
      const payment: MovementCreateDto = {
        idIncome: accIncome.id,
        idOutcome: data.idOutcome,
        reason: data.reason,
        amount: data.amount,
        id: '',
        fees: 0,
        date: new Date(),
      };
      return this.accountService.newPayment(payment);
    } catch (error) {
      throw new HttpException(
        'No se ha podido realizar la transacción' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
