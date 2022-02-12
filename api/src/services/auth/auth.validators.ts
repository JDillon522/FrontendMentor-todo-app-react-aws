import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";

export const AccessTokenHeader = createParamDecorator(
  async (property: string | number | symbol, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;

    if (headers['access-token']) {
      return headers['access-token'];
    }

    throw new HttpException('Access-Token is required in the header', HttpStatus.BAD_REQUEST);
  },
);
