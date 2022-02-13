import { Controller, Post, UseGuards, Body, BadRequestException, HttpCode, Redirect, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AuthConfirmDto, AuthService, JwtAuthGuard } from '../services/auth/auth.service';
import { AuthDto } from '../services/auth/auth.service';
import { AccessTokenHeader, AuthRefreshToken, AuthUserToken } from '../services/auth/auth.validators';


@Controller('api/auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  @Post('register')
  async register(@Body() AuthRegisterDto: AuthDto) {
    if (
      AuthRegisterDto.password.length < 8 ||
      !/[a-z]/.test(AuthRegisterDto.password) ||
      !/[A-Z]/.test(AuthRegisterDto.password) ||
      !/[0-9]/.test(AuthRegisterDto.password)
    ) {
      throw new BadRequestException('Password requirements not met.');
    }
    try {
      return await this.authService.register(AuthRegisterDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('confirm')
  async confirm(@Body() confirmDto: AuthConfirmDto) {
    try {
      return await this.authService.confirmAccount(confirmDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login')
  async login(@Body() req: AuthDto) {
    return this.authService.login(req);
  }

  @Post('logout')
  @Redirect('/', 205)
  @UseGuards(JwtAuthGuard)
  async logout(@AuthRefreshToken() token: string) {
    return this.authService.logout(token);
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  async checkIfTokenValid(@AuthRefreshToken() refresh: string, @AccessTokenHeader() access: string) {
    if (refresh && access) {
      return;
    }
    throw new HttpException('State is no longer valid', HttpStatus.UNAUTHORIZED);;
  }
}
