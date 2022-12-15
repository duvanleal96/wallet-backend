import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../../common/postgres/entities/account.entity';
import { MovementService } from '../../../modules/movement/services/movement.service';
import { AccountUpdateDto } from '../dto/update.account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly movementService: MovementService,
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
    return account as AccountEntity;
  }

  async updateAccount(id: string, updateAccount: AccountUpdateDto) {
    const account = await this.getAccountByIdClient(id);
    account.balance = updateAccount.balance;
    account.credit = updateAccount.credit;
    account.updatedAt = new Date(Date.now());
    const newAccount = await this.accountRepository.save(account);
    return Promise.resolve(newAccount);
  }
}
