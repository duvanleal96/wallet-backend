import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ClientEntity } from './client.entity';
import { v4 as uuid } from 'uuid';
import { AppsInterface } from '../../../modules/apps/interface/apps.interface';

@Index('pkapp', ['id'], { unique: true })
@Index('app_cli_id_Idx', ['idClient'], { unique: true })
@Entity('app', { schema: 'public' })
export class AppEntity {
  @Column('uuid', { primary: true, name: 'app_id' })
  id: string = uuid();

  @Column('uuid', { name: 'cli_id' })
  idClient: string;

  @Column('character varying', {
    name: 'app_color',
    length: 30,
    default: () => "'default'",
  })
  color = '#1554F7';

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
  client: ClientEntity;
  constructor(app?: AppsInterface) {
    if (app?.color) this.color = app?.color;
  }
}
