import { Module } from '@nestjs/common';
import { AppsController } from './controllers/apps.controller';
import { AppsService } from './services/apps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppEntity } from '../../common/postgres/entities/app.entity';

@Module({
  controllers: [AppsController],
  providers: [AppsService],
  exports: [AppsService],
  imports: [TypeOrmModule.forFeature([AppEntity])],
})
export class AppsModule {}
