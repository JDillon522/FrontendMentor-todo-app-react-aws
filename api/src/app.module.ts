import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { ApiController } from './api/api.controller';
import { DatabaseService } from './services/database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './database/entities/item.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './services/auth/auth.service';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwkPem, JwtStrategy } from './auth/jwt.strategy';
import { UserService } from './services/user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', '..', 'dist', 'client'),
      exclude: ['/api*']
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Item
      ],
      logging: true,
      synchronize: process.env.NODE_ENV === 'production' ? false : true
    }),
    TypeOrmModule.forFeature([Item]),
    PassportModule,
    JwtModule.register({
      secret: jwkPem(),
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [
    AppController,
    ApiController,
    AuthController,
    UserController
  ],
  providers: [
    DatabaseService,
    AuthService,
    JwtStrategy,
    UserService
  ],
})
export class AppModule {}
