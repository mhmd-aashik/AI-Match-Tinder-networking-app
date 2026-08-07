import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import type { AuthenticatedUser } from './auth/types/authenticated-user.type';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return {
      status: 'ok',
      service: 'api-gateway',
      timestamp: new Date().toISOString(),
    };
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: AuthenticatedUser) {
    return req.user;
  }
}
