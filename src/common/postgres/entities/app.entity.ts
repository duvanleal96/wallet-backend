import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ClientEntity } from './client.entity';

@Index('pkapp', ['id'], { unique: true })
@Index('app_cli_id_Idx', ['cliId'], { unique: true })
@Entity('app', { schema: 'public' })
export class AppEntity {
  @Column('uuid', { primary: true, name: 'app_id' })
  id: string;

  @Column('uuid', { name: 'cli_id' })
  cliId: string;

  @Column('character varying', {
    name: 'app_color',
    length: 30,
    default: () => "'#1554F6'",
  })
  color: string;

  @Column('timestamp without time zone', {
    name: 'app_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'app_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @OneToOne(() => ClientEntity, (client) => client.app, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  cli: ClientEntity;
}
