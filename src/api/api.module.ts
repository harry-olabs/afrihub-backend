import { Module } from '@nestjs/common';

import { ApiRoutingModule } from './api-routing.module';
import { ApiController } from './api.controller';

@Module({
  imports: [ApiRoutingModule],
  controllers: [ApiController],
})
export class ApiModule {}
