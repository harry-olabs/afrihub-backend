import { Module } from '@nestjs/common';

import { ApiRoutingModule } from './api-routing.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApiController } from './api.controller';

@Module({
  imports: [ApiRoutingModule, AuthModule, UsersModule],
  controllers: [ApiController],
})
export class ApiModule {}
