import { Column, Entity, Index, OneToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { AppEntity } from './app.entity';
import { ClienteCreateDto } from '../../../modules/client/dto/cliente.create.dto';

@Index('client_cli_email_Idx', ['cliEmail'], { unique: true })
@Index('pkclient', ['cliId'], { unique: true })
@Index('client_cli_phone_Idx', ['cliPhone'], { unique: true })
@Entity('client', { schema: 'public' })
export class ClientEntity {
  @Column('uuid', { primary: true, name: 'cli_id' })
  cliId: string;

  @Column('character varying', { name: 'cli_full_name', length: 500 })
  fulName: string;

  @Column('character varying', { name: 'cli_email', length: 500 })
  email: string;

  @Column('character varying', { name: 'cli_phone', length: 500 })
  phone: string;

  @Column('character varying', { name: 'cli_photo', length: 500 })
  photo: string;

  @Column('integer', { name: 'cli_state', default: () => '1' })
  state: number;

  @Column('timestamp without time zone', {
    name: 'cli_created_at',
    default: () => 'now()',
  })
  createAt: Date;

  @Column('timestamp without time zone', {
    name: 'cli_updated_at',
    nullable: true,
  })
  updateAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cli_deleted_at',
    nullable: true,
  })
  deleteAll: Date | null;

  @OneToOne(() => AccountEntity, (account) => account.cli)
  account: AccountEntity;

  @OneToOne(() => AppEntity, (app) => app.cli)
  app: AppEntity;

  constructor(client?: ClienteCreateDto) {
    this.fulName = client?.fullName;
    this.email = client?.email;
    this.phone = client?.phone;
    this.photo = client?.photo;
    this.state = client?.state ?? 1;
    this.createAt = new Date();
    this.updateAt = null;
    this.account = new AccountEntity();
    this.app = new AppEntity();
  }
}
