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
      throw new HttpException(
        'Tenemos problemas para insertar un cliente',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getClientByEmail(email: string): Promise<ClientGetDto> {
    try {
      const client = await this.clientRepository.findOneOrFail({
        where: { email: email },
      });
      const color = await this.appService.getColorByIdClient(client.id);
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
