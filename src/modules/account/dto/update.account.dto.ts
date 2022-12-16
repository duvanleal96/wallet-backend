import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ClientEntity } from '../../../common/postgres/entities/client.entity';
import { MovementEntity } from '../../../common/postgres/entities/movement.entity';
import { AccountInterface } from '../interface/account.interface';
export class AccountUpdateDto implements AccountInterface {
  @IsOptional()
  id: string;

  @IsOptional()
  @IsString({
    message: 'The `photo` argument must be of type string',
  })
  idClient: string;

  @IsOptional()
  balance: string;

  @IsOptional()
  @IsString({
    message: 'The `credit` argument must be of type string',
  })
  credit: string;

  @IsOptional()
  @IsNumber({}, { message: 'The `state` argument must be of type number' })
  state: number;

  @IsOptional()
  @IsDate({
    message: 'The `createdAt` argument must be of type Date',
  })
  createdAt: Date | null;

  @IsOptional()
  @IsDate({
    message: 'The `updatedAt` argument must be of type Date',
  })
  updatedAt: Date | null;

  @IsOptional()
  @IsDate({
    message: 'The `deletedAt` argument must be of type Date',
  })
  deletedAt: Date | null;

  @IsOptional()
  client: ClientEntity;

  @IsOptional()
  movementsIncome: MovementEntity[];

  @IsOptional()
  movementsOutcome: MovementEntity[];
  constructor(data?: AccountInterface) {
    this.balance = data?.balance as string;
    this.credit = data?.balance as string;
  }
}
