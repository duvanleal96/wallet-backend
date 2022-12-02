import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Client } from './Client';
import { Movement } from './Movement';

@Index('pkaccount', ['accId'], { unique: true })
@Index('account_cli_id_Idx', ['cliId'], { unique: true })
@Entity('account', { schema: 'public' })
export class Account {
  @Column('uuid', { primary: true, name: 'acc_id' })
  accId: string;

  @Column('uuid', { name: 'cli_id' })
  cliId: string;

  @Column('bigint', { name: 'acc_balance', default: () => '0' })
  accBalance: string;

  @Column('bigint', { name: 'acc_credit', default: () => '50000000' })
  accCredit: string;

  @Column('integer', { name: 'acc_state', default: () => '1' })
  accState: number;

  @Column('timestamp without time zone', {
    name: 'acc_created_at',
    default: () => 'now()',
  })
  accCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'acc_updated_at',
    nullable: true,
  })
  accUpdatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'acc_deleted_at',
    nullable: true,
  })
  accDeletedAt: Date | null;

  @OneToOne(() => Client, (client) => client.account, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'cliId' }])
  cli: Client;

  @OneToMany(() => Movement, (movement) => movement.accIdIncome2)
  movements: Movement[];

  @OneToMany(() => Movement, (movement) => movement.accIdOutcome2)
  movements2: Movement[];
}
