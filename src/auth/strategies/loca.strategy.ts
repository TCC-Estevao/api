import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import normalizeIPAddress from 'src/utils/normalize-ip';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

const redisClient = new Redis({ enableOfflineQueue: false });

const maxWrongAttemptsByIPperDay = 10;

const limiterSlowBruteByIP = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'login_fail_ip_per_day',
  points: maxWrongAttemptsByIPperDay,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24, // Block for 1 day, if 10 wrong attempts per day
});

export class LoginUserData {
  readonly email: string;
  readonly password: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(req: Request, email: string, password: string) {
    const ip = normalizeIPAddress(req.ip);

    const resSlowByIP = await limiterSlowBruteByIP.get(ip);

    let retrySecs = 0;
    if (
      resSlowByIP !== null &&
      resSlowByIP.consumedPoints >= maxWrongAttemptsByIPperDay
    ) {
      retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
    }

    if (retrySecs > 0) {
      throw new HttpException('Too Many Request', HttpStatus.TOO_MANY_REQUESTS);
    }
    try {
      const user = await this.authService.validateUser(email, password);
      limiterSlowBruteByIP.delete(ip);
      return user;
    } catch (error) {
      await limiterSlowBruteByIP.consume(ip);
      throw new UnauthorizedException(error.message);
    }
  }
}
