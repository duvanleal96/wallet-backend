import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppEntity } from '../../../common/postgres/entities/app.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(AppEntity)
    private readonly appRepository: Repository<AppEntity>,
  ) {}
  async getColor(id: string) {
    const app = await this.appRepository.findOne({
      where: { cliId: id },
    });

    return app?.color;
  }
}
