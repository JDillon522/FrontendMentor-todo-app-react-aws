import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

const port = process.env.PORT || 3000;

if (process.env.USERNAME === 'root') {
  console.log('LOADING PROD ENV - MAIN');

  config({ path: '/opt/elasticbeanstalk/deployment/env'});
}

async function bootstrap() {
  console.log(
    `HOST=${process.env.DB_HOST}`,
    `USERNAME=${process.env.DB_USERNAME}`,
    `PASSWORD=${process.env.DB_PASSWORD}`,
    `DATABASE=${process.env.DB_NAME}`,
  )
  const app = await NestFactory.create(AppModule);

  await app.listen(port);
}
bootstrap();
