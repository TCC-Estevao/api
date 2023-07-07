import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorator/is-public.decorator';
import { UnauthorizedError } from '../errors/unautorizedError';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflactor: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const IsPublic = this.reflactor.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (IsPublic) return true;

    const canActivate = super.canActivate(context);

    if (typeof canActivate === 'boolean') return canActivate;

    const canActivatePromise = canActivate as Promise<boolean>;

    return canActivatePromise.catch((error) => {
      if (error instanceof UnauthorizedError) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException();
    });
  }
}
