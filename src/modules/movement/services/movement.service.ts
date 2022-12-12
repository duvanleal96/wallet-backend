import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementEntity } from '../../../common/postgres/entities/movement.entity';
import { MovementCreateDto } from '../dto/movement.create.dto';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(MovementEntity)
    private readonly movementRepository: Repository<MovementEntity>,
  ) {}

  createMovement(movementInput: MovementCreateDto): Promise<MovementEntity> {
    const movement = new MovementEntity(movementInput);
    return this.movementRepository.save(movement);
  }
}
