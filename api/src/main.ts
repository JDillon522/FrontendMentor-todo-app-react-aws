import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = process.env.PORT || 3000;

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
