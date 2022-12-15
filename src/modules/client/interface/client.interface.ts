import { AccountEntity } from '../../../common/postgres/entities/account.entity';
import { AppEntity } from '../../../common/postgres/entities/app.entity';

export interface ClientInterface {
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
}
