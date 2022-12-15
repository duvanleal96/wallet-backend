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
  async getMovments(accId: string): Promise<MovementEntity[]> {
    const movements: MovementEntity[] = await this.movementRepository.find({
      where: [{ accIdIncome: accId }, { accIdOutcome: accId }],
    });
    return movements;
  }
  addPayment(payment: MovementCreateDto) {
    console.log('payment --> ', payment);
    const movement = new MovementEntity();
    movement.accIdIncome = payment.idIncome;
    movement.accIdOutcome = payment.idOutcome;
    movement.reason = payment.reason;
    movement.amount = payment.amount;
    movement.fees = 1;
    return this.movementRepository.save(movement);
  }
}
