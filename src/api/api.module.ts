import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApiController } from './api.controller';
import { ApiRoutingModule } from './api-routing.module';

@Module({
  imports: [ApiRoutingModule, AuthModule, UsersModule],
  controllers: [ApiController],
})
export class ApiModule {}
