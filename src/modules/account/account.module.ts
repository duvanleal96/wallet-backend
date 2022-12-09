import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { AccountEntity } from '../../common/postgres/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [TypeOrmModule.forFeature([AccountEntity])],
})
export class AccountModule {}
