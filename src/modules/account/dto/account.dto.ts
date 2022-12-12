import { ClientEntity } from '../../../common/postgres/entities/client.entity';
import { MovementEntity } from '../../../common/postgres/entities/movement.entity';
import { AccountInterface } from '../interface/account.interface';

export class AccountDto implements AccountInterface {
  id: string;
  idClient: string;
  balance: string;
  credit: string;
  state: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  client: ClientEntity;
  movementsIncome: MovementEntity[];
  movementsOutcome: MovementEntity[];
  accId: any;
}
