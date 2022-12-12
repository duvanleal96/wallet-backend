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

  async getColorByIdClient(id: string) {
    const app = await this.appRepository.findOne({
      where: {
        cliId: id,
      },
    });
    return app?.color;
  }

  async updateApp(updateApp: appsDto) {
    const appNew = await this.appRepository.update(
      { cliId: updateApp.cliId },
      { color: updateApp.color },
    );
    console.log(appNew);
    return updateApp;
  }
}
