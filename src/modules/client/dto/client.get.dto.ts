import { IsEmail, IsString, IsUUID } from 'class-validator';
import { AccountEntity } from '../../../common/postgres/entities/account.entity';
import { AppEntity } from '../../../common/postgres/entities/app.entity';
import { ClientEntity } from '../../../common/postgres/entities/client.entity';
import { ClientInterface } from '../interface/client.interface';

export class ClientGetDto implements ClientInterface {
  id: string;

  fullName: string;

  email: string;

  phone: string;

  photo: string;

  state: number;

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;

  account: AccountEntity;

  app: AppEntity;

  constructor(client?: ClientEntity) {
    this.id = client?.id as string;
    this.fullName = client?.fullName as string;
    this.email = client?.email as string;
    this.phone = client?.phone as string;
    this.photo = client?.photo as string;
    this.state = client?.state as number;
    this.createdAt = client?.createdAt as Date;
    this.updatedAt = client?.updatedAt as Date;
  }
}
