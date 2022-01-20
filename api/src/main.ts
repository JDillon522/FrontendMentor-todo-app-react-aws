import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

const port = process.env.PORT || 3000;

console.log('=============== BEFORE MAIN =============', process.env);
if (process.env.USERNAME === 'root') {
  console.log('==== ROOT USER ====');

  config()
} else {
  console.log('===== NOT ROOT USER =====');
  config({ path: '../.env' });
}

console.log(
  `HOST=${process.env.DB_HOST}\n`,
  `USERNAME=${process.env.DB_USERNAME}\n`,
  `PASSWORD=${process.env.DB_PASSWORD}\n`,
  `DATABASE=${process.env.DB_NAME}\n`,
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log('-------------- ENV IN MAIN ---------------', process.env);
  await app.listen(port);
}
bootstrap();
