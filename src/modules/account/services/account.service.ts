import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementInterface } from '../../../modules/movement/interface/movement.interface.dto';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../../common/postgres/entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async getAccountByIdClient(id: string): Promise<AccountEntity | null> {
    const account = await this.accountRepository.findOne({
      where: {
        cliId: id,
      },
      relations: {
        movementsIncome: true,
        movementsOutcome: true,
      },
    });
    return Promise.resolve(account);
  }

  async getMovementsByAccountId(id: string) {
    const account = await this.accountRepository.findOne({
      where: {
        cliId: id,
      },
      relations: {
        movementsIncome: true,
        movementsOutcome: true,
      },
    });
    const incomes = account.movementsIncome;
    const outcomes = account.movementsOutcome;
    const ids = new Set(incomes.map((element) => element.id));
    const transactions: MovementInterface[] = [
      ...incomes,
      ...outcomes.filter((item) => !ids.has(item.id)),
    ];
    return transactions;
  }
}
