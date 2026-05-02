import { Controller, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as crypto from 'crypto';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const token = await this.authService.login(dto.password);
    const csrfToken = crypto.randomBytes(32).toString('hex');

    const sharedOpts = {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 24 * 60 * 60 * 1000,
    };

    // httpOnly — inaccessible to JS, carries the JWT
    res.cookie('access_token', token, { ...sharedOpts, httpOnly: true });
    // NOT httpOnly — frontend reads this and sends it as X-CSRF-Token header
    res.cookie('csrf_token', csrfToken, { ...sharedOpts, httpOnly: false });

    return res.json({ status: true });
  }
}
