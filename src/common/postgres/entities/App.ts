import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Client } from './Client';

@Index('pkapp', ['appId'], { unique: true })
@Index('app_cli_id_Idx', ['cliId'], { unique: true })
@Entity('app', { schema: 'public' })
export class App {
  @Column('uuid', { primary: true, name: 'app_id' })
  appId: string;

  @Column('uuid', { name: 'cli_id' })
  cliId: string;

  @Column('character varying', {
    name: 'app_color',
    length: 30,
    default: () => "'default'",
  })
  appColor: string;

  @Column('timestamp without time zone', {
    name: 'app_created_at',
    default: () => 'now()',
  })
  appCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'app_updated_at',
    nullable: true,
  })
  appUpdatedAt: Date | null;

  @OneToOne(() => Client, (client) => client.app, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'cliId' }])
  cli: Client;
}
