import { Module } from '@nestjs/common';
import { SessionController } from './controllers/session.controller';
import { SessionService } from './services/session.service';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
