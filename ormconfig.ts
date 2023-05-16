import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * Load .env file
 * @example It loads .env.test file when NODE_ENV=test
 */
const env = (key: string) => process.env[key];
const envFile = `.env${env('NODE_ENV') ? `.${env('NODE_ENV')}` : ''}`;

dotenv.config({
  path: path.resolve(__dirname, envFile),
});

const isTestEnvironment = env('NODE_ENV') === 'true';

export default {
  type: env('DB_DIALECT') as any,
  host: env('DB_HOST'),
  port: env('DB_PORT') as unknown as number,
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_DATABASE'),
  entities: [path.resolve(__dirname, 'src/**/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'src/database/migrations/**/*.ts')],
  seeds: [path.resolve(__dirname, 'src/database/seeds/**/*.ts')],
  factories: [path.resolve(__dirname, 'src/database/factories/**/*.ts')],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  synchronize: isTestEnvironment,
  dropSchema: isTestEnvironment,
};
