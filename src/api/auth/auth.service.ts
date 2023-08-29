import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../users/users.repository';
import { IAuthResponseDto } from './dto/auth-response.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { RefreshTokensRepository } from './refresh-tokens.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly refreshTokensRepo: RefreshTokensRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpAuthDto): Promise<IAuthResponseDto> {
    const newUser = await this.usersRepo.create({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: await this.hashData(dto.password),
    });
    const user = await this.usersRepo.save(newUser);
    const tokens = await this.getAuthTokens(user.id, user.email);

    return tokens;
  }

  async login(dto: LoginAuthDto) {
    const user = await this.usersRepo.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access denied');

    const pwdDoesNotMatch = this.comparePassword(dto.password, user.password);
    if (!pwdDoesNotMatch) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getAuthTokens(user.id, user.email);
    return tokens;
  }

  async logout() {
    return 'logout';
  }

  async refreshToken() {
    return 'refresh';
  }

  /**
   * Encrypts a given data
   * @param data The data to be encrypted
   * @returns string
   */
  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async getAuthTokens(
    userId: number,
    email: string,
  ): Promise<IAuthResponseDto> {
    const payload = { sub: userId, email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '5m',
        secret: 'JWT_SECRET',
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '10m',
        secret: 'RT_SECRET',
      }),
    ]);

    await this.storeRefreshToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(userId: number, token: string) {
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 60 * 10 * 1000);

    const refreshToken = await this.refreshTokensRepo.create({
      token: await this.hashData(token),
      expireAt: expiryDate.toISOString(),
      user: {
        id: userId,
      },
    });
    await this.refreshTokensRepo.save(refreshToken);
  }

  async getProfile(id: number) {
    return this.usersRepo.findOneBy({ id });
  }
}
