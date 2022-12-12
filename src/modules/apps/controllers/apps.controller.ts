import { Body, Controller, Put, ValidationPipe } from '@nestjs/common';
import { appsDto } from '../dto/apps.dto';
import { AppsService } from '../services/apps.service';

@Controller('api/apps/theme')
export class AppsController {
  constructor(private readonly AppsService: AppsService) {}

  @Put()
  updateApp(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updateApp: appsDto,
  ) {
    return this.AppsService.updateApp(updateApp);
  }
}
