import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { stringify } from 'qs';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { JwtService } from '@nestjs/jwt';
import { equal } from 'assert';

export interface UserInfo {
  sub: string,
  email_verified: 'true'|'false',
  email: string,
  username: string,
  password?: string
}

export interface DummyUser {
  email: string;
  password?: string;
  userId?: string;
}

export const jwtConstants = {
  secret: 'superSecretKey'
}

const {
  COGNITO_CLIENT_ID,
  COGNITO_DOMAIN_NAME_URL,
  COGNITO_LOGIN_GRANT_TYPE,
  COGNITO_LOGIN_REDIRECT_URL,
  COGNITO_LOGIN_RESPONSE_TYPE,
  COGNITO_LOGIN_SCOPE,
  COGNITO_LOGOUT_REDIRECT_URL,
} = process.env;

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  private users: DummyUser[] = [
    {
      email: 'joseph.dillon.522@gmail.com',
      password: 'test123'
    }
  ];

  constructor(
    private jwt: JwtService
  ) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: DummyUser) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwt.sign(payload)
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findOne(email);
    if (user && user.password === password) {
      const { password, ...result } = user; // clever way to remove a single property
      return result;
    }
    return null;
  }

  async findOne(email: string): Promise<DummyUser | undefined> {
    return this.users.find(user => user.email === email);
  }
}


@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {};

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {};
