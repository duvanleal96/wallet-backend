import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountEntity } from '../../../common/postgres/entities/account.entity';

@Injectable()
export class AccountService {
  getAccountById(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private dataSource: DataSource) {}
}
