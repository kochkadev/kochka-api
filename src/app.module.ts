import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import globalConfig from './config/global.config';
import { DatabaseModule } from './modules/database';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [globalConfig] }),
    DatabaseModule,
  ],
})
export class AppModule {}
