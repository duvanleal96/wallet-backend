import { ClientEntity } from '../../../common/postgres/entities/client.entity';
import { MovementEntity } from '../../../common/postgres/entities/movement.entity';

export interface AccountInterface {
  id: string;
  idClient: string;
  balance: number;
  credit: number;
  state: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  client: ClientEntity;
  movementsIncome: MovementEntity[];
  movementsOutcome: MovementEntity[];
}
