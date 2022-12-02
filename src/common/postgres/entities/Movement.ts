import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Account } from "./Account";

@Index(
  "movement_acc_id_income_acc_id_outcome_Idx",
  ["accIdIncome", "accIdOutcome"],
  {}
)
@Index("pkmovement", ["movId"], { unique: true })
@Entity("movement", { schema: "public" })
export class Movement {
  @Column("uuid", { primary: true, name: "mov_id" })
  movId: string;

  @Column("uuid", { name: "acc_id_income" })
  accIdIncome: string;

  @Column("uuid", { name: "acc_id_outcome" })
  accIdOutcome: string;

  @Column("character varying", { name: "mov_reason", length: 500 })
  movReason: string;

  @Column("bigint", { name: "mov_amount" })
  movAmount: string;

  @Column("integer", { name: "mov_fees", default: () => "1" })
  movFees: number;

  @Column("timestamp without time zone", {
    name: "mov_datetime",
    default: () => "now()",
  })
  movDatetime: Date;

  @ManyToOne(() => Account, (account) => account.movements, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "acc_id_income", referencedColumnName: "accId" }])
  accIdIncome2: Account;

  @ManyToOne(() => Account, (account) => account.movements2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "acc_id_outcome", referencedColumnName: "accId" }])
  accIdOutcome2: Account;
}
