import { Module } from '@nestjs/common';
import { AppsController } from './controllers/apps.controller';
import { AppsService } from './services/apps.service';

@Module({
  controllers: [AppsController],
  providers: [AppsService],
})
export class AppsModule {}
