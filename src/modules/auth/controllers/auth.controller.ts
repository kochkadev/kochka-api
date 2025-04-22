import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SignInRequestDto } from '../dto/sign-in-request.dto';
import { AuthService } from '../services/auth.service';
import { SignUpRequestDto } from '../dto/sign-up-request.dto';
import { GetJwtPayload } from '../../../decorators/get-jwt-payload.decorator';
import { RefreshTokenGuard } from '../../../guards/refresh-jwt.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'Sign in' })
  async signIn(
    @Body() dto: SignInRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.authService.signIn(dto, res);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up' })
  async signUp(
    @Body() dto: SignUpRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.authService.signUp(dto, res);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Refresh tokens' })
  async refresh(
    @Res() res: Response,
    @GetJwtPayload('id') userId: string,
  ): Promise<void> {
    return this.authService.refreshTokens(userId, res);
  }
}
