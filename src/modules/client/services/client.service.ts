import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClienteCreateDto } from 'src/modules/client/dto/cliente.create.dto';
import { ClientEntity } from 'src/common/postgres/entities/client.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(private dataSource: DataSource) {}

  async createNewClient(clientInput: ClienteCreateDto): Promise<ClientEntity> {
    const client = new ClientEntity(clientInput);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    console.log(client);

    try {
      const newClient = await queryRunner.manager.save(client);
      await queryRunner.commitTransaction();
      return Promise.resolve(newClient);
    } catch (err) {
      console.log(err);

      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'there are problems inserting a client',
        HttpStatus.CONFLICT,
      );
    }
  }
}
