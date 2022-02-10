import { Controller, Post, UseGuards, Body, BadRequestException } from '@nestjs/common';
import { AuthConfirmDto, AuthService, JwtAuthGuard } from '../services/auth/auth.service';
import { AuthDto } from '../services/auth/auth.service';


@Controller('auth')
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

  // @UseGuards(CognitoAuthGuard)
  @Post('login')
  async login(@Body() req: AuthDto) {
    return this.authService.login(req);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Body() body: { access_token: string }) {
    return this.authService.logout(body.access_token);
  }
}
