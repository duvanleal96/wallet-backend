import { Body, Controller, Param, Put, ValidationPipe } from '@nestjs/common';
import { appsDto } from '../dto/apps.dto';
import { AppsService } from '../services/apps.service';

@Controller('api/apps/theme')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Put(':id')
  //@UseGuards(AuthGuard)
  updateApp(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updateApp: appsDto,
  ) {
    return this.appsService.updateApp(id, updateApp);
  }
}
