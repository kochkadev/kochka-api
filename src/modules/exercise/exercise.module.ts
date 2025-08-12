import { Module } from '@nestjs/common';
import { ExerciseService } from './services/exercise.service';
import { ExerciseController } from './controllers/exercise.controller';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule {}
