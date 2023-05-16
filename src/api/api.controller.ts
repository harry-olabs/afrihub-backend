import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get()
  main() {
    return {
      info: 'WatchtowerOS API',
    };
  }
}
