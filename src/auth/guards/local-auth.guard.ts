import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      if (err.status === HttpStatus.TOO_MANY_REQUESTS) {
        throw new HttpException(err.message, HttpStatus.TOO_MANY_REQUESTS);
      }

      throw new UnauthorizedException(err?.message);
    }
    return user;
  }
}
