import { Module } from '@nestjs/common';
import { SessionController } from './controllers/session.controller';
import { SessionService } from './services/session.service';
import { SessionExerciseService } from './services/session-exercise.service';
import { SessionExerciseController } from './controllers/session-exercise.controller';

@Module({
  controllers: [SessionController, SessionExerciseController],
  providers: [SessionService, SessionExerciseService],
})
export class SessionModule {}
