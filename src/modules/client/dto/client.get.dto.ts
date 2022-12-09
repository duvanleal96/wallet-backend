import { IsEmail, IsString, IsUUID } from 'class-validator';
import { ClientInterface } from '../interface/client.interface';

export class ClientGetDto implements ClientInterface {
  @IsUUID()
  id: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  photo: string;

  @IsString()
  app: string;
}
