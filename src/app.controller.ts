import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  main() {
    return {
      info: 'Welcome to Afridev Hub',
    };
  }
}
