import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const { email, name, id, isAdmin, spendingLimit } = user;
    const payload: UserPayload = {
      email,
      name,
      isAdmin,
      spendingLimit,
      sub: id,
    };
    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
      email,
      isAdmin,
      name,
      spendingLimit,
    };
  }
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isPasswordValid = await compare(password, user.password);
      if (isPasswordValid)
        return {
          ...user,
          password: undefined,
        };
    }
    throw new Error('Email address and/or password is incorrect');
  }
}
