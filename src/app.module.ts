import { Module } from '@nestjs/common';
import { AppController } from '../src/common/modules/main/controllers/app.controller';
import { AppService } from './common/modules/main/services/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
