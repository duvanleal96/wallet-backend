import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ClientEntity } from '../../../common/postgres/entities/client.entity';

export class appsDto {
  @IsNotEmpty()
  @IsUUID()
  cliId: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date | null;

  @IsOptional()
  client: ClientEntity;
}
