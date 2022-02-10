import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import {
  SignUpCommandInput,
  SignUpCommand,
  ConfirmSignUpCommandInput,
  ConfirmSignUpCommand,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  RevokeTokenCommand,
  RevokeTokenCommandInput,

} from '@aws-sdk/client-cognito-identity-provider';
import { createHmac } from 'crypto';

export interface AuthDto {
  email: string;
  password: string;
}

export interface AuthConfirmDto {
  email: string;
  code: string;
}

@Injectable()
export class AuthService {
  private client = new CognitoIdentityProviderClient({});

  constructor(
    private jwt: JwtService
  ) {

  }

  private hashSecret(email: string): string {
    return createHmac('sha256', process.env.COGNITO_CLIENT_SECRET)
            .update(email + process.env.COGNITO_CLIENT_ID)
            .digest('base64');
  }

  async register(user: AuthDto) {
    const params: SignUpCommandInput = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Password: user.password,
      Username: user.email,
      SecretHash: this.hashSecret(user.email),
      UserAttributes: [],
    }

    const command = new SignUpCommand(params);
    const response = await this.client.send(command);

    console.log(response);
  }

  async confirmAccount(user: AuthConfirmDto) {
    const params: ConfirmSignUpCommandInput = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: user.email,
      SecretHash: this.hashSecret(user.email),
      ConfirmationCode: user.code
    }
    const command = new ConfirmSignUpCommand(params);
    const response = await this.client.send(command);

    console.log(response)
  }

  async login(user: AuthDto) {
    try {
      const params: InitiateAuthCommandInput = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
          USERNAME: user.email,
          PASSWORD: user.password,
          SECRET_HASH: this.hashSecret(user.email),

        }
      }

      const command = new InitiateAuthCommand(params);

      const response = await this.client.send(command);

      return {
        response: response,
        access_token: response.AuthenticationResult.AccessToken,
        id_token: response.AuthenticationResult.IdToken,
        user: this.jwt.decode(response.AuthenticationResult.IdToken)
      }

    } catch (error) {
      return new UnauthorizedException(error.message);
    }
  }

  async logout(accessToken: string) {
    const params: RevokeTokenCommandInput = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      ClientSecret: process.env.COGNITO_CLIENT_SECRET,
      Token: accessToken
    };

    const command = new RevokeTokenCommand(params);
    const response = await this.client.send(command);

    return response;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {};
