import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'cookie-session';


const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(session({
  //   secret: process.env.COOKIE_SESSION_SECRET,
  //   name: process.env.COOKIE_SESSION_NAME,
  //   cookie: {
  //     secure: false,
  //     httpOnly: true,
  //   }
  // }));

  await app.listen(port);
}
bootstrap();
