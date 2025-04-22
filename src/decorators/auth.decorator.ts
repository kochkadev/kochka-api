import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function Auth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiCookieAuth('access_token'),
  );
}
