import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('-------------- ENV IN MAIN ---------------', process.env);
  await app.listen(port);
}
bootstrap();
