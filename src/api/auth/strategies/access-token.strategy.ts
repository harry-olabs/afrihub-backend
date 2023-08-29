import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AT_STRATEGY } from '../constants/strategy.constant';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  AT_STRATEGY,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'JWT_SECRET',
    });
  }

  async validate(payload: any) {
    // return { userId: payload.sub, username: payload.username };
    return payload;
  }
}
