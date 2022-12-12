import { ClientEntity } from '../../../common/postgres/entities/client.entity';

export interface AppsInterface {
  id: string;
  idClient: string;
  color: string;
  createdAt: Date;
  updatedAt: Date | null;
  client: ClientEntity;
}
