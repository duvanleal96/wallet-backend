import { Column, Entity, Index, OneToOne } from 'typeorm';
import { Account } from './Account';
import { App } from './App';

@Index('client_cli_email_Idx', ['cliEmail'], { unique: true })
@Index('pkclient', ['cliId'], { unique: true })
@Index('client_cli_phone_Idx', ['cliPhone'], { unique: true })
@Entity('client', { schema: 'public' })
export class Client {
  @Column('uuid', { primary: true, name: 'cli_id' })
  cliId: string;

  @Column('character varying', { name: 'cli_full_name', length: 500 })
  cliFullName: string;

  @Column('character varying', { name: 'cli_email', length: 500 })
  cliEmail: string;

  @Column('character varying', { name: 'cli_phone', length: 500 })
  cliPhone: string;

  @Column('character varying', { name: 'cli_photo', length: 500 })
  cliPhoto: string;

  @Column('integer', { name: 'cli_state', default: () => '1' })
  cliState: number;

  @Column('timestamp without time zone', {
    name: 'cli_created_at',
    default: () => 'now()',
  })
  cliCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'cli_updated_at',
    nullable: true,
  })
  cliUpdatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cli_deleted_at',
    nullable: true,
  })
  cliDeletedAt: Date | null;

  @OneToOne(() => Account, (account) => account.cli)
  account: Account;

  @OneToOne(() => App, (app) => app.cli)
  app: App;
}
