import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientEntity } from '../../../common/postgres/entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AppsService } from '../../apps/services/apps.service';
import { ClientGetDto } from '../dto/client.get.dto';
import { ClienteCreateDto } from '../dto/cliente.create.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly appService: AppsService,
    private readonly dataSource: DataSource,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async createClient(clientInput: ClienteCreateDto): Promise<ClientEntity> {
    const client = new ClientEntity(clientInput);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newClient = await queryRunner.manager.save(client);
      await queryRunner.commitTransaction();
      return Promise.resolve(newClient);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      console.log(err);
      throw new HttpException(
        'Tenemos problemas para insertar un cliente',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getClientByEmail(data: string): Promise<ClientGetDto> {
    const validEmail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (validEmail.test(data)) {
      const client = await this.clientRepository.findOne({
        where: {
          email: data,
        },
        relations: {
          account: true,
          app: true,
        },
      });
      if (client === null || client === undefined) {
        throw new HttpException(
          `Client with email ${data} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      return Promise.resolve(client);
    }
    const client = await this.clientRepository.findOne({
      where: {
        phone: data,
      },
      relations: {
        account: true,
        app: true,
      },
    });
    if (client === null || client === undefined) {
      throw new HttpException(
        `Client with phone ${data} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return Promise.resolve(client);
  }
}
