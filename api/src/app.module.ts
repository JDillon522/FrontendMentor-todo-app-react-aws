import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { ApiController } from './api/api.controller';
import { DatabaseService } from './database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './database/entities/item.entity';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

const configOpts: ConfigModuleOptions = {}
if (process.env.USERNAME === 'root') {
  console.log('LOADING PROD ENV - MODULE')
  configOpts.envFilePath = '/opt/elasticbeanstalk/deployment/env';
}

@Module({
  imports: [
    ConfigModule.forRoot(configOpts),
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
      synchronize: false
    }),
    TypeOrmModule.forFeature([Item])
  ],
  controllers: [
    AppController,
    ApiController
  ],
  providers: [
    DatabaseService
  ],
})
export class AppModule {}
