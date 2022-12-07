import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientEntity } from '../../../common/postgres/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppsService } from '../../apps/services/apps.service';
import { ClientGetDto } from '../dto/client.get.dto';
import { ClienteCreateDto } from '../dto/cliente.create.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly appService: AppsService,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async createClient(
    client: ClienteCreateDto,
  ): Promise<ClientEntity | undefined> {
    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      switch (error.code) {
        case '23505':
          if (error.constraint === 'client_cli_email_Idx')
            throw new HttpException(
              'Email is already registered',
              HttpStatus.CONFLICT,
            );
          else if (error.constraint === 'client_cli_phone_Idx')
            throw new HttpException(
              'The telephone number is already registered',
              HttpStatus.CONFLICT,
            );
          break;
        default:
          throw new HttpException(
            'We have problems creating a client. Code: ' +
              error.code +
              '. ' +
              error.detail,
            HttpStatus.CONFLICT,
          );
      }
    }
  }
  async getClientByEmail(email: string): Promise<ClientGetDto> {
    try {
      const client = await this.clientRepository.findOneOrFail({
        where: { email: email },
      });
      const color = await this.appService.getColor(client.id);
      return {
        id: client.id,
        fullName: client.fullName,
        email: client.email,
        phone: client.phone,
        photo: client.photo,
        app: color ?? '',
      };
    } catch (error) {
      throw new HttpException(
        `el cliente con ${email} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
