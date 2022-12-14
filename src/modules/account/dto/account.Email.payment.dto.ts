import {
  IsUUID,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
export class AccountEmailPaymentDto {
  @IsEmail()
  @IsNotEmpty()
  emailIncome: string;

  @IsNotEmpty()
  @IsUUID()
  idOutcome: string;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
