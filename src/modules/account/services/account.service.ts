import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountEntity } from '../../../common/postgres/entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private dataSource: DataSource) {}

  async getAccountByIdClient(id: string): Promise<AccountEntity> {
    const account = await this.dataSource.getRepository(AccountEntity).findOne({
      where: {
        idClient: id,
      },
      relations: { movementsIncome: true, movementsOutcome: true},
    });
    return Promise.resolve(account);
  }

