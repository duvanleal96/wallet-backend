import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../../common/postgres/entities/account.entity';
import { AccountDto } from '../dto/account.dto';
import { MovementService } from '../../../modules/movement/services/movement.service';
import { MovementCreateDto } from '../../movement/dto/movement.create.dto';
import { LoanDto } from '../dto/loans.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly movementService: MovementService,
  ) {}

  async getAccountInfo(id: string): Promise<AccountDto> {
    const accountDto = new AccountDto();
    const account = await this.accountRepository.findOneOrFail({
      where: { cliId: id },
      relations: {
        movementsIncome: true,
        movementsOutcome: true,
      },
    });
    const movements = await this.movementService.getMovments(account.id);
    accountDto.id = account.id;
    accountDto.cliId = account.cliId;
    accountDto.balance = account.balance;
    accountDto.credit = account.credit;
    accountDto.movements = movements;
    return accountDto;
  }
  async newLoan(loan: LoanDto) {
    try {
      const account: AccountEntity = await this.accountRepository.findOneOrFail(
        {
          where: { id: loan.idIncome },
        },
      );
      const movement = await this.movementService.createLoan(loan);
      account.balance += loan.amount;
      account.credit -= loan.amount;
      this.accountRepository.save(account);
      return movement;
    } catch (error) {
      throw new HttpException(
        'oh ha ocurrido un error --> ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async newPayment(payment: MovementCreateDto) {
    try {
      const accountIncome: AccountEntity =
        await this.accountRepository.findOneOrFail({
          where: { id: payment.idIncome },
        });
      console.log('accountIncome :>> ', accountIncome);
      const accountOutcome: AccountEntity =
        await this.accountRepository.findOneOrFail({
          where: { id: payment.idOutcome },
        });
      console.log('accountOutcome :>> ', accountOutcome);
      if (accountOutcome.balance < payment.amount) {
        throw new HttpException('Insuficent funds', HttpStatus.BAD_REQUEST);
      }
      const movement = await this.movementService.addPayment(payment);
      accountIncome.balance += payment.amount;
      accountOutcome.balance -= payment.amount;
      this.accountRepository.save([accountIncome, accountOutcome]);
      return movement;
    } catch (error) {
      throw new HttpException(
        'oh ha ocurrido un error -->' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
