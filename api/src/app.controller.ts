import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {
    console.log(process.env)
    console.log(
      `HOST=${process.env.DB_HOST}`,
      `USERNAME=${process.env.DB_USERNAME}`,
      `PASSWORD=${process.env.DB_PASSWORD}`,
      `DATABASE=${process.env.DB_NAME}`,
    )
  }
}
