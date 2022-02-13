import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwkToPem from 'jwk-to-pem';
import { RSA } from 'jwk-to-pem';


export const cognitoJwk = {
  keys: [
    { // Works for ID Token
      alg: 'RS256',
      e: 'AQAB',
      kid: 'lwRfsyMwQA0tYJALqqnRrLdmwSZwtlCqr0dLsjRuKG8=',
      kty: 'RSA',
      n: 't_PuZ-CWmbCQaHXaSJosSzmMavl21op0P3WHZGNgJtMq-MuB49xyLRan_1MzMVZzXHGSbrjDX_48jU64AqxCrEMXPzcjROuO-Tnxgi41hY-AnvbCNwcaXIxGPRs1w0CBbXerp0yA8zmCWYSOuvtwZFp9VRtUeamCo7IB7uJ2ag4q9otCgFBOZaBIN9gXe1y4Vi2urACxoRJDx72_gpezS5PinWWY1CsL2yY7p4giZnlS8EUpiObDcoReBeouyf8IY2b0KnwD7kiQguS9fUh44qEBC8uuWIb2LQlozGvlAVXpl3sXLHELxkT6pfMUzzC7SMTytiZhMKGYi47PindHGw',
      use: 'sig'
    },
    { // Works for access token
      alg: 'RS256',
      e: 'AQAB',
      kid: '5SSIWzNq8UxNWANGPIj14R/dm3VH0qcCzhd8uyhpldc=',
      kty: 'RSA',
      n: '2E23mv9zc4tz91sDhnC9Bct7MwVTTW-lVUl0N8l10zyN9PT2EkUYwaffXYXU2jgS-WxiWUR0D0yBshvo7xyT09zRfgtPiyyH9pXFiKmgWKdbOkhbkGQJGTQ8DFvyIfaGfo1HRag8JTUafk1op1oXW1SXEURQHMOupL165d0AFibMpI0foLVcsAkY5mkDeCERcLXnULb3sa_ep3yFb4W91gCEy-EZM6aXDzWtJ_mYZJ4yPlc6N_DMhrsChcaXv-Z0sCjsFVWVfln_OInxg79JRurIW8fb4rDLvCvHgi-BSFE0vRgK_pWH9UORqqdcR5SlNx1n6s6twxsvbGdEUsZ-Aw',
      use: 'sig'
    }
  ]
}

export const jwkPem = () => {
  const pem = jwkToPem(cognitoJwk.keys[0] as RSA);
  return pem;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwkPem()
    });
  }

  async validate(payload: any) {
    return payload;
  }
}


