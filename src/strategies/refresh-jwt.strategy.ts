import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JWT_SECRET, REFRESH_TOKEN_COOKIE_NAME } from '../config/auth.config';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies[
            String(this.configService.get(REFRESH_TOKEN_COOKIE_NAME))
          ];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWT_SECRET) as string,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
