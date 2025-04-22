import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ACCESS_TOKEN_JWT_EXPIRATION_TIME, JWT_SECRET } from '../../config/auth.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
        signOptions: {
          expiresIn: configService.get(ACCESS_TOKEN_JWT_EXPIRATION_TIME),
        },
      }),
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AuthModule {}
