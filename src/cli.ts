import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const replServer = await repl(AppModule);
  // Preserves the REPL's command history between the runs/reloads
  replServer.setupHistory('.cli_history', (err) => {
    if (err) {
      console.error(err);
    }
  });
}
bootstrap();
