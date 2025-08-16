import { Module } from '@nestjs/common';
import { TrainingService } from './services/training.service';
import { TrainingController } from './controllers/training.controller';
import { TrainingExerciseController } from './controllers/training-exercise.controller';
import { TrainingExerciseService } from './services/training-exercise.service';

@Module({
  controllers: [TrainingController, TrainingExerciseController],
  providers: [TrainingService, TrainingExerciseService],
})
export class TrainingModule {}
