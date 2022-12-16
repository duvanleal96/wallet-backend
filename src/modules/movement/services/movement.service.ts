import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from '../../../modules/account/services/account.service';
import { Repository } from 'typeorm';
import { MovementEntity } from '../../../common/postgres/entities/movement.entity';
import { MovementCreateDto } from '../dto/movement.create.dto';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(MovementEntity)
    private readonly movementRepository: Repository<MovementEntity>,
    @Inject(AccountService)
    private readonly accountService: AccountService,
  ) {}
  async createMovement(
    movementInput: MovementCreateDto,
  ): Promise<MovementEntity> {
    const movement = new MovementEntity(movementInput);
    const accountIncome = await this.accountService.getAccountByIdAccount(
      movement.accIdIncome,
    );
    const accountOutcome = await this.accountService.getAccountByIdAccount(
      movement.accIdOutcome,
    );
    console.log('accountIncome :>> ', accountIncome);
    console.log('accountOutcome :>> ', accountOutcome);
    if (movement.accIdIncome !== movement.accIdOutcome) {
      const newBalaceAccountIncome =
        Number(accountIncome.balance) + movement.amount;
      accountIncome.balance = newBalaceAccountIncome.toString();
      accountIncome.updatedAt = new Date(Date.now());
      await this.accountService.updateAccount(
        accountIncome.idClient,
        accountIncome,
      );

      const newBalaceAccountOutcome =
        Number(accountOutcome.balance) - movement.amount;
      accountOutcome.balance = newBalaceAccountOutcome.toString();
      accountOutcome.updatedAt = new Date(Date.now());
      await this.accountService.updateAccount(
        accountOutcome.idClient,
        accountOutcome,
      );
    } else {
      const newBalanceLoan = Number(accountIncome.balance) + movement.amount;
      accountIncome.balance = newBalanceLoan.toString();
      const newCredit = Number(accountIncome.credit) - movement.amount;
      accountIncome.credit = newCredit.toString();
      accountIncome.updatedAt = new Date(Date.now());
      await this.accountService.updateAccount(
        accountIncome.idClient,
        accountIncome,
      );
    }

    return this.movementRepository.save(movement);
  }
}
