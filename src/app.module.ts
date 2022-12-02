import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './common/postgres/entities/account.entity';
import { AppEntity } from './common/postgres/entities/app.entity';
import { ClientEntity } from './common/postgres/entities/client.entity';
import { MovementEntity } from './common/postgres/entities/movement.entity';
import { AccountModule } from './modules/account/account.module';
import { ClientModule } from './modules/client/client.module';
import { AppController } from './modules/main/controller/app.controller';
import { AppService } from './modules/main/services/app.service';
import { MovementModule } from './modules/movement/movement.module';
import { AppsModule } from './modules/apps/apps.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'wallet',
      entities: [AccountEntity, AppEntity, ClientEntity, MovementEntity],
      synchronize: false,
    }),
    AccountModule,
    AppsModule,
    ClientModule,
    MovementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
