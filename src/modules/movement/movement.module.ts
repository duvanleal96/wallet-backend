import { Module } from '@nestjs/common';
import { MovementController } from './controllers/movement.controller';
import { MovementService } from './services/movement.service';

@Module({
  controllers: [MovementController],
  providers: [MovementService],
})
export class MovementModule {}
