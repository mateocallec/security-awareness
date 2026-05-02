import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(password: string): Promise<string> {
    const validPassword = process.env.DASHBOARD_PASSWORD;
    if (!validPassword || password !== validPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    return this.jwtService.sign({ sub: 'admin', role: 'admin' });
  }
}
