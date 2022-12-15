import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ClientEntity } from './client.entity';
import { MovementEntity } from './movement.entity';
import { v4 as uuid } from 'uuid';
import { AccountDto } from '../../../modules/account/dto/account.dto';

@Index('pkaccount', ['id'], { unique: true })
@Index('account_cli_id_Idx', ['idClient'], { unique: true })
@Entity('account', { schema: 'public' })
export class AccountEntity {
  @Column('uuid', { primary: true, name: 'acc_id' })
  id: string = uuid();

  @Column('uuid', { name: 'cli_id' })
  idClient: string;

  @Column('bigint', { name: 'acc_balance', default: () => '0' })
  balance: string;

  @Column('bigint', { name: 'acc_credit', default: () => '50000000' })
  credit: string;

  @Column('integer', { name: 'acc_state', default: () => '1' })
  state: number;

  @Column('timestamp without time zone', {
    name: 'acc_created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'acc_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'acc_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToOne(() => ClientEntity, (client) => client.account, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  client: ClientEntity;

  @OneToMany(() => MovementEntity, (movement) => movement.accIdIncome, {
    cascade: ['update'],
  })
  movementsIncome: MovementEntity[];

  @OneToMany(() => MovementEntity, (movement) => movement.accIdOutcome, {
    cascade: ['update'],
  })
  movementsOutcome: MovementEntity[];

  constructor(account?: AccountDto) {
    if (account?.id) this.id = account.id as string;
    if (account?.balance) this.balance = account.balance as string;
    if (account?.credit) this.credit = account.credit as string;
    if (account?.state) this.state = account.state as number;
    if (account?.createdAt) this.createdAt = account.createdAt;
    if (account?.updatedAt) this.updatedAt = account.updatedAt;
    if (account?.deletedAt) this.deletedAt = account.deletedAt;
  }
}
