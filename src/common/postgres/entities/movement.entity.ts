import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { v4 as uuid } from 'uuid';
import { MovementCreateDto } from '../../../modules/movement/dto/movement.create.dto';

@Index(
  'movement_acc_id_income_acc_id_outcome_Idx',
  ['accIdIncome', 'accIdOutcome'],
  {},
)
@Index('pkmovement', ['id'], { unique: true })
@Entity('movement', { schema: 'public' })
export class MovementEntity {
  @Column('uuid', { primary: true, name: 'mov_id' })
  id: string = uuid();

  @Column('uuid', { name: 'acc_id_income' })
  accIdIncome: string;

  @Column('uuid', { name: 'acc_id_outcome' })
  accIdOutcome: string;

  @Column('character varying', { name: 'mov_reason', length: 500 })
  reason: string;

  @Column('bigint', {
    name: 'mov_amount',
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  amount: number;

  @Column('integer', { name: 'mov_fees', default: () => '0' })
  fees: number;

  @Column('timestamp without time zone', {
    name: 'mov_datetime',
    default: () => 'now()',
  })
  movDatetime: Date;

  @ManyToOne(() => AccountEntity, (account) => account.movementsIncome, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_income', referencedColumnName: 'id' }])
  accIdIncome2: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.movementsOutcome, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_outcome', referencedColumnName: 'id' }])
  accIdOutcome2: AccountEntity;

  constructor(movement?: MovementCreateDto) {
    this.accIdIncome = movement?.idIncome;
    this.accIdOutcome = movement?.idOutcome;
    this.reason = movement?.reason;
    this.amount = movement?.amount;
    this.fees = movement?.fees;
  }
}
