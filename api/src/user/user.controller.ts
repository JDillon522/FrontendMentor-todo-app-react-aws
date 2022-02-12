import { Body, Controller, Get, Headers, Post, Redirect, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthenticatedDto, JwtAuthGuard } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { AttributeType } from '@aws-sdk/client-cognito-identity-provider';
import { AccessTokenHeader } from '../services/auth/auth.validators';

@Controller('api/user')
export class UserController {

  constructor(
    private userService: UserService
  ) { }


  @Get()
  @UseGuards(JwtAuthGuard)
  public async getUser(
    @AccessTokenHeader() token: string
  ) {
    return this.userService.getUser(token);
  }

  @Post()
  @UseGuards(JwtStrategy)
  @Get()
  @Redirect('/api/user')
  public async updateUser(
    @AccessTokenHeader() token: string,
    @Body() body: { attrs: AttributeType[] }
  ) {
    for await (const attr of body.attrs) {
      this.userService.updateUser(token, attr);
    }
  }
}
