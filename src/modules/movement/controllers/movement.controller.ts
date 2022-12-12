import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { MovementCreateDto } from '../dto/movement.create.dto';
import { MovementService } from '../services/movement.service';

@Controller('api/movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  createNewMovement(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newMovement: MovementCreateDto,
  ) {
    return this.movementService.createMovement(newMovement);
  }
}
