import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementInterface } from '../../../modules/movement/interface/movement.interface.dto';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../../common/postgres/entities/account.entity';
import { AccountUpdateDto } from '../dto/update.account.dto';
import { MovementEntity } from '../../../common/postgres/entities/movement.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async getAccountByIdClient(id: string): Promise<AccountEntity> {
    const account = await this.accountRepository.findOne({
      where: {
        idClient: id,
      },
      relations: {
        movementsIncome: true,
        movementsOutcome: true,
      },
    });
    return Promise.resolve(account as AccountEntity);
  }

  async updateAccount(id: string, updateAccount: AccountUpdateDto) {
    const account = await this.getAccountByIdClient(id);
    account.balance = updateAccount.balance;
    account.credit = updateAccount.credit;
    account.updatedAt = new Date(Date.now());
    const newAccount = await this.accountRepository.save(account);
    return Promise.resolve(newAccount);
  }

  /*async getMovementsByAccountId(id: string) {
    const account = await this.accountRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        movementsIncome: true,
        movementsOutcome: true,
      },
    });
    const incomes = account?.movementsIncome;
    const outcomes = account?.movementsOutcome;
    const ids = new Set(incomes?.map((element) => element.id));
    const transactions: MovementInterface[] = [
      ...incomes,
      ...outcomes.filter((item) => !ids.has(item.id)),
    ];
    return transactions;
  }*/

  async getAccountByIdAccount(id: string): Promise<AccountEntity> {
    const account = await this.accountRepository.findOne({
      where: {
        id: id,
      },
    });
    return Promise.resolve(account as AccountEntity);
  }
}
