import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,}$/, {
    message: 'Senha muito fraca',
  })
  password: string;

  @IsString()
  name: string;
}
