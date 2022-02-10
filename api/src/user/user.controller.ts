import { Body, Controller, Get, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { JwtStrategy } from '../auth/jwt.strategy';
import { JwtAuthGuard } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { AttributeType } from '@aws-sdk/client-cognito-identity-provider';

@Controller('api/user')
export class UserController {

  constructor(
    private userService: UserService
  ) { }


  @Get()
  @UseGuards(JwtAuthGuard)
  public async getUser(@Headers('AccessToken') token) {
    return this.userService.getUser(token);
  }

  @Post()
  @UseGuards(JwtStrategy)
  public async updateUser(@Headers('AccessToken') token, @Body() body: { attrs: AttributeType[] }) {
    for await (const attr of body.attrs) {
      this.userService.updateUser(token, attr);
    }

    return this.getUser(token);
  }
}
