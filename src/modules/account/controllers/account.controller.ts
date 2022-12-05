import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from '../services/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  getAccountById(@Param('id') id: string) {
    return this.accountService.getAccountById(id);
  }
}
