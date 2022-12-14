import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovementInterface } from '../../../modules/movement/interface/movement.interface.dto';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../../common/postgres/entities/account.entity';
import { AccountDto } from '../dto/account.dto';
import { MovementService } from '../../../modules/movement/services/movement.service';

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
    const movements = await this.movementService.getMovments(account.accId);
    accountDto.id = account.accId;
    accountDto.cliId = account.cliId;
    accountDto.balance = account.balance;
    accountDto.credit = account.credit;
    accountDto.movementsIncome = movements;
    return accountDto;
  }
}
