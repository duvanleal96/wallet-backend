import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { AccountEntity } from '../../common/postgres/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../../common/postgres/entities/client.entity';
import { AppEntity } from '../../common/postgres/entities/app.entity';
import { MovementEntity } from '../../common/postgres/entities/movement.entity';
import { MovementService } from '../movement/services/movement.service';
import { ClientService } from '../client/services/client.service';
import { AppsService } from '../apps/services/apps.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, MovementService, ClientService, AppsService],
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      ClientEntity,
      AppEntity,
      MovementEntity,
    ]),
  ],
})
export class AccountModule {}
