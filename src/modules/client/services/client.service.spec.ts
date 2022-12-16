import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountEntity } from '../../../common/postgres/entities/account.entity';
import { AppEntity } from '../../../common/postgres/entities/app.entity';
import { ClientEntity } from '../../../common/postgres/entities/client.entity';
import { Repository } from 'typeorm';
import { ClientService } from './client.service';

type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

describe('ClientService', () => {
  let service: ClientService;
  let repositoryMock: MockType<Repository<ClientEntity>>;
  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      save: jest.fn((data) => data),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(ClientEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repositoryMock = module.get(getRepositoryToken(ClientEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a client (Equal)', async () => {
    // Arrange
    const client = new ClientEntity();
    client.fullName = 'Julian Lasso';
    client.email = 'julian.lasso@sofka.com.co';
    client.phone = '1234567890';
    client.photo =
      'https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png';
    client.account = new AccountEntity();
    client.app = new AppEntity();
    const dataMock = { ...client };
    const expected = { ...client };
    jest.spyOn(repositoryMock, 'save').mockReturnValue(dataMock);

    // Act
    const clientCreated = await service.createClient(client);

    // Assert
    expect(clientCreated).toEqual(expected);
  });

  it('should create a client (Not Equal)', async () => {
    // Arrange
    const client = new ClientEntity();
    client.fullName = 'duvan leal';
    client.email = 'duvan.leal@sofka.com.co';
    client.phone = '1234567890';
    client.photo =
      'https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png';
    client.account = new AccountEntity();
    client.app = new AppEntity();
    const dataMock = { ...client, fullName: 'Andres Figueroa' };
    const expected = { ...client };
    jest.spyOn(repositoryMock, 'save').mockReturnValue(dataMock);

    // Act
    const clientCreated = await service.createClient(client);

    // Assert
    expect(clientCreated).not.toEqual(expected);
  });
});
