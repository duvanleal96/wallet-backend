import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ClientEntity } from '../../../common/postgres/entities/client.entity';

export class appsDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  idClient: string;

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
