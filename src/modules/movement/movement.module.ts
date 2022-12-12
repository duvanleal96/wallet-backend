import { Module } from '@nestjs/common';
import { MovementController } from './controllers/movement.controller';
import { MovementService } from './services/movement.service';
import { AccountService } from '../account/services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../../common/postgres/entities/account.entity';
import { MovementEntity } from '../../common/postgres/entities/movement.entity';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [MovementController],
  providers: [MovementService, AccountService],
  imports: [
    TypeOrmModule.forFeature([AccountEntity, MovementEntity]),
    AccountModule,
  ],
})
export class MovementModule {}
