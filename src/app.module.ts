import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ApiModule],
  controllers: [AppController],
})
export class AppModule {}
