import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import globalConfig from './config/global.config';
import { DatabaseModule } from '@database';
import { UserModule } from './modules/user/user.module';
import authConfig from './config/auth.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { TrainingModule } from './modules/training/training.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [globalConfig, authConfig],
    }),
    DatabaseModule,
    UserModule,
    ExerciseModule,
    TrainingModule,
  ],
  providers: [JwtStrategy, RefreshJwtStrategy],
})
export class AppModule {}
