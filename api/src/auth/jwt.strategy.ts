import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as jwkToPem from 'jwk-to-pem';
import { RSA } from 'jwk-to-pem';


export const cognitoJwk = {
  keys: [
    // works for id_token
    {
      alg: "RS256",
      e: "AQAB",
      kid: "/fOLUr4TDWX5MwIkAlHHmsaukiLKFh/5hqiKMMXobKk=",
      kty: "RSA",
      n: "yCzErkNrWuhkyWCyxcwslRg_4hNv8xixegJOL9-uaoWYvbJ-Gald2C-kf46wmH5MwPRuo9iRIsb3JJL6WIoziVBqxyYM1zObcbHMz7WNVTYJej0lExOuG7FdOr0cT-x_-OVhi1AJ-Otf5d86gCiOlhaRI-BJee-z-8jMhHKTcEq01DEPzTN8J4NzllCL3WwewESVNhX4gpOGBiWYXuLjDURoeWt_Alcxcci6HdruaRMf3SzPNlfXr-mN7k3nY6lyrCsmFuWRdJtmusqiv0AOL2Yel4ZwuhQ-tLFmYw3hNM7NwfwnVMCekqdZBVR8yXv0HjQcdzjTghdjxI0XnF7Oxw",
      use: "sig"
    },
    {
      // works for access key
      alg: "RS256",
      e: "AQAB",
      kid: "d9hcS9mnboGVeGvxynPE+GmrqXQaIinmuFSaQewnckk=",
      kty: "RSA",
      n: "oXVBREZXCMk7-dk1ggtKFaukniw63O0u_jAsndl_hqJ1Ud8rqDloZ9SDNzBQ83RgmXqXws1EpUOOdBPs4pZYTypxnZwgoEc5K0ycuOn4YC6EjA88ezpSjtZsQg6nwX8VtMNorwe9LsUgSBqCZt0eQQEhzjK0jV_NQFETGg30arK_f5h58s1qH1atQcbk_cZTgOwIuzfsAZrWpmZ5CWC4FkOP1DDp9bJPoMeqgidQbOejytYCYv8V9I05zJACncmia33P63db6MX4hF8xVD2mo4TkQ0twC3P38F5VdyOQwaJrVE9A69KcOGnzqrPoRIqJmrlhhpjQ0aVoSrduAb2HFw",
      use: "sig"
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


