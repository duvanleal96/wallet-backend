import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { ClientService } from '../../../modules/client/services/client.service';
import { AccountEntity } from '../../../common/postgres/entities/account.entity';
import { AccountUpdateDto } from '../dto/update.account.dto';

@Controller('api/account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private clientService: ClientService,
  ) {}

  @Get(':id')
  getAccountByIdClient(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.getAccountByIdClient(id);
  }

  @Put(':id')
  updateAccountByIdClient(
    @Param('id') id: string,
    @Body() updateAccount: AccountUpdateDto,
  ): Promise<AccountEntity> {
    return this.accountService.updateAccount(id, updateAccount);
  }

  @Get('/dto/:id')
  getAccountByIdAccount(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.getAccountByIdAccount(id);
  }
}
