import { MovementEntity } from '../../../common/postgres/entities/movement.entity';
export class AccountDto {
  id: string;
  cliId: string;
  balance: number;
  credit: number;
  movements: MovementEntity[];
}
