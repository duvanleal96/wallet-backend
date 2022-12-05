import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ClientEntity } from 'src/common/postgres/entities/client.entity';
import { ClientService } from '../services/client.service';
import { ClienteCreateDto } from '../dto/cliente.create.dto';

@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('signup')
  signup(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newClient: ClienteCreateDto,
  ): Promise<ClientEntity> {
    return this.clientService.createNewClient(newClient);
  }
}
