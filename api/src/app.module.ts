import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path/posix';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientAppService } from './services/client-app/client-app.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', '..', 'dist', 'client'),
      exclude: ['/api*']
    })
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    ClientAppService
  ],
})
export class AppModule {}
