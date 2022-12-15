import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { ClientService } from '../../../modules/client/services/client.service';
import { AccountEntity } from '../../../common/postgres/entities/account.entity';

@Controller('api/account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private clientService: ClientService,
  ) {}

  @Get(':id')
  getAccountByIdClient(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.getAccountByIdClient(id);
  }
}
