import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Request,
  Res,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { AT_STRATEGY } from './constants/strategy.constant';
// import { IAuthResponseDto } from './dto/auth-response.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpAuthDto: SignUpAuthDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.signUp(
      signUpAuthDto,
    );

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken });
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      loginAuthDto,
    );
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken });
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Post('refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }

  @Get('/me')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard(AT_STRATEGY))
  meProfile(@Req() req: Request) {
    const userId = (req as any).user.sub;
    return this.authService.getProfile(userId);
  }
}
