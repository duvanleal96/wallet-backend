import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ClientEntity } from '../../../common/postgres/entities/client.entity';
import { ClientService } from '../services/client.service';
import { ClienteCreateDto } from '../dto/cliente.create.dto';
import { ClientGetDto } from '../dto/client.get.dto';

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
  ): Promise<ClientEntity | undefined> {
    return this.clientService.createClient(newClient);
  }

  @Get(':email')
  getClientByEmail(@Param('email') email: string): Promise<ClientGetDto> {
    return this.clientService.getClientByEmail(email);
  }
}
