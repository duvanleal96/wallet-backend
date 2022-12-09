import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';
import { ClientEntity } from '../../common/postgres/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppsService } from '../apps/services/apps.service';
import { AppsModule } from '../apps/apps.module';
import { AppEntity } from '../../common/postgres/entities/app.entity';

@Module({
  controllers: [ClientController],
  providers: [ClientService, AppsService],
  imports: [TypeOrmModule.forFeature([ClientEntity, AppEntity]), AppsModule],
})
export class ClientModule {}
