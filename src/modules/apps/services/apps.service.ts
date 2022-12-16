import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppEntity } from '../../../common/postgres/entities/app.entity';
import { Repository } from 'typeorm';
import { appsDto } from '../dto/apps.dto';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(AppEntity)
    private readonly appRepository: Repository<AppEntity>,
  ) {}

  async updateApp(id: string, updateApp: appsDto) {
    const app = await this.getAppByIdClient(id);
    app.color = updateApp.color;
    app.updatedAt = new Date(Date.now());
    const newApp = await this.appRepository.save(app);
    return Promise.resolve(newApp);
  }

  async getAppByIdClient(id: string): Promise<AppEntity> {
    const account = await this.appRepository.findOne({
      where: {
        idClient: id,
      },
    });
    return Promise.resolve(account as AppEntity);
  }
}
