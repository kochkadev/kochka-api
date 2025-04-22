import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { SignInRequestDto } from '../dto/sign-in-request.dto';
import * as bcrypt from 'bcrypt';
import { INVALID_CREDENTIALS } from '../../../constants/errors';
import { ISignUpRequest, IUserSafeResponse } from '@kochkadev/kochka-contracts';
import { Tokens } from '../../../types/tokens.type';
import { JwtPayload } from '../../../types/jwt-payload.type';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_JWT_EXPIRATION_TIME,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_JWT_EXPIRATION_TIME,
  SALT_ROUNDS,
} from '../../../config/auth.config';
import { COOKIE_DOMAIN } from '../../../config/global.config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(dto: SignInRequestDto, res: Response): Promise<void> {
    const { passwordHash, refreshTokenHash, ...user } =
      await this.userService.getUserOrThrow({ username: dto.login });
    const isRightPassword = this.comparePassword(dto.password, passwordHash);
    if (!isRightPassword) {
      throw new ForbiddenException(INVALID_CREDENTIALS);
    }
    const tokens = await this.generateTokens(user);
    this.setTokenCookies(res, tokens);
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private async generateTokens(user: IUserSafeResponse): Promise<Tokens> {
    try {
      const jwtPayload: JwtPayload = {
        id: user.id,
        username: user.username,
      };
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          expiresIn: this.configService.get(ACCESS_TOKEN_JWT_EXPIRATION_TIME),
        }),
        this.jwtService.signAsync(jwtPayload, {
          expiresIn: this.configService.get(REFRESH_TOKEN_JWT_EXPIRATION_TIME),
        }),
      ]);
      const saltRounds = this.configService.get(SALT_ROUNDS);
      const refreshTokenHash = await bcrypt.hash(refreshToken, saltRounds);
      this.userService.update(user.id, { refreshTokenHash });
      return { accessToken, refreshToken };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  private setTokenCookies(res: Response, tokens: Tokens): void {
    const domain = String(this.configService.get(COOKIE_DOMAIN));
    const sameSite = 'lax';
    const secure = process.env.NODE_ENV === 'production';
    const accessCookieName = this.configService.get(ACCESS_TOKEN_COOKIE_NAME);
    const refreshCookieName = this.configService.get(REFRESH_TOKEN_COOKIE_NAME);
    res.cookie(accessCookieName, tokens.accessToken, {
      httpOnly: true,
      domain,
      sameSite,
      secure,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie(refreshCookieName, tokens.refreshToken, {
      httpOnly: true,
      domain,
      sameSite,
      secure,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  public async signOut(userId: string, res: Response): Promise<void> {
    const user = await this.userService.getUserOrThrow({ id: userId });
    if (!user?.refreshTokenHash) {
      throw new ForbiddenException(INVALID_CREDENTIALS);
    }
    await this.userService.clearRefreshHash(userId);
    const cookieDomain = String(this.configService.get<string>(COOKIE_DOMAIN));
    res.clearCookie(String(this.configService.get(ACCESS_TOKEN_COOKIE_NAME)), {
      domain: cookieDomain,
    });
    res.clearCookie(String(this.configService.get(REFRESH_TOKEN_COOKIE_NAME)), {
      domain: cookieDomain,
    });
  }

  public async signUp(
    signUpData: ISignUpRequest,
    res: Response,
  ): Promise<void> {
    const { password, ...createData } = signUpData;
    const saltRound = this.configService.get(SALT_ROUNDS);
    const passwordHash: string = await bcrypt.hash(
      signUpData.password,
      saltRound,
    );
    const user = await this.userService.createUser({
      ...createData,
      passwordHash,
    });
    const tokens: Tokens = await this.generateTokens(user);
    this.setTokenCookies(res, tokens);
  }

  private resetTokenCookies(res: Response): void {
    const domain = this.configService.get<string>('COOKIE_DOMAIN');
    const sameSite = 'none';
    const secure = true;
    res.cookie(String(this.configService.get(ACCESS_TOKEN_COOKIE_NAME)), '', {
      httpOnly: true,
      domain,
      sameSite,
      secure,
      maxAge: -1,
    });
    res.cookie(String(this.configService.get(REFRESH_TOKEN_COOKIE_NAME)), '', {
      httpOnly: true,
      domain,
      sameSite,
      secure,
      maxAge: -1,
    });
  }

  public async refreshTokens(userId: string, res: Response): Promise<void> {
    // Delete old cookies
    this.resetTokenCookies(res);
    const user = await this.userService.getUserOrThrow({ id: userId });
    const tokens = await this.generateTokens(user);
    this.setTokenCookies(res, tokens);
  }
}
