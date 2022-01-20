import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { NestApplicationOptions } from '@nestjs/common';

const port = process.env.PORT || 3000;
const appOptions: NestApplicationOptions = {};

console.log('=============== BEFORE MAIN =============', process.env);
if (process.env.PWD === '/var/app/current/api/dist/api') {
  console.log('==== ROOT USER ====');

  config()
  appOptions.logger = ['log', 'error', 'warn', 'debug','verbose'];
} else {
  console.log('===== NOT ROOT USER =====');
  appOptions.logger = ['log', 'error', 'warn', 'debug','verbose'];
  config({ path: '../.env' });
}

console.log(
  '\n=====================================\n',
  `HOST=${process.env.DB_HOST}\n`,
  `USERNAME=${process.env.DB_USERNAME}\n`,
  `PASSWORD=${process.env.DB_PASSWORD}\n`,
  `DATABASE=${process.env.DB_NAME}\n`,
  '\n=====================================\n'
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, appOptions);
  // console.log('-------------- ENV IN MAIN ---------------', process.env);
  await app.listen(port);
}
bootstrap();
