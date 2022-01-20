import { Controller, Logger, OnModuleInit } from '@nestjs/common';

@Controller()
export class AppController implements OnModuleInit {
  private logger = new Logger();

  constructor( ) {
  }

  onModuleInit() {
    this.logger.log(
      `HOST=${process.env.DB_HOST}`,
      `USERNAME=${process.env.DB_USERNAME}`,
      `PASSWORD=${process.env.DB_PASSWORD}`,
      `DATABASE=${process.env.DB_NAME}`,
    )
  }
}
