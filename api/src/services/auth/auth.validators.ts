import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { JwtUserDto } from "../../database/models/user";

export const AccessTokenHeader = createParamDecorator(
  async (property: string | number | symbol, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;

    if (headers['access-token']) {
      return headers['access-token'];
    }

    throw new HttpException('Access-Token is required in the header', HttpStatus.BAD_REQUEST);
  },
);

export const AuthUserToken = createParamDecorator(
  async (property: string, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;

    if (headers['authorization']) {
      return headers.authorization.replace('Bearer ', '');
    }

    throw new HttpException('Authorization is required in the header', HttpStatus.BAD_REQUEST);
  }
);

export const AuthRefreshToken = createParamDecorator(
  async (property: string, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;

    if (headers['refresh-token']) {
      return headers['refresh-token'];
    }

    throw new HttpException('Refresh-Token is required in the header', HttpStatus.BAD_REQUEST);
  }
);

export const JwtUser = createParamDecorator(
  async (property: string, ctx: ExecutionContext) => {
    const user: JwtUserDto = ctx.switchToHttp().getRequest().user;
    const userDto = plainToInstance(JwtUserDto, user);

    if (!user) {
      throw new HttpException('Missing user JWT data', HttpStatus.BAD_REQUEST);
    }

    return userDto;
  }
)
