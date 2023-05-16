import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async signUp(dto: SignUpAuthDto) {
    const user = new User();
    user.email = dto.email;
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.password = await this.hashPassword(dto.password);

    const newUser = await this.usersRepo.save(user);
    return newUser;
  }

  async login(dto: LoginAuthDto) {
    return 'login';
  }

  async logout() {
    return 'logout';
  }

  async refreshToken() {
    return 'refresh';
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
