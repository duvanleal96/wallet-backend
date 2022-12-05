import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should store a client'),
    () => {
      //Arrange
      const newClient = {
        fullName: 'duvan leal',
        email: 'duvanleal65@gmail.com',
        phonr: '3219218832',
      };
      const expected = {
        id: '',
        photo: '',
        state: 1,
        createdAt: '',
        updatedAt: null,
        account: {
          id: 'b36a554b-6948-42b6-a177-56fee24814fb',
          idClient: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
          updatedAt: null,
          deletedAt: null,
          balance: '0',
          credit: '50000000',
          state: 1,
          createdAt: '2022-12-01T21:29:01.414Z',
        },
        app: {
          id: 'fa11307e-768f-4e33-9836-ef11a76aa70e',
          idClient: 'f03c4464-2aea-4330-a9fb-eda42fb5c724',
          updatedAt: null,
          color: 'default',
          createdAt: '2022-12-01T21:29:01.414Z',
        },
        deletedAt: null,

        ...newClient,
      };
      //Act
      const result = service.createNewClient(newClient);

      //Assert
      expect(result).resolves.toEqual(expected);
    };
});
