import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class appsDto {
  @IsNotEmpty()
  @IsUUID()
  cliId: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}
