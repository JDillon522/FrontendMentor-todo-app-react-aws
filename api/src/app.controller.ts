import { Controller, Get, Param, Req, Response, ResponseDecoratorOptions  } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientAppService } from './services/client-app/client-app.service';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly clientService: ClientAppService
  ) {}

  @Get('api')
  getHello(): string {
    return this.appService.getHello();
  }
}
