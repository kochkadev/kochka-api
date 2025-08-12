import { Module } from '@nestjs/common';
import { TrainingService } from './services/training.service';
import { TrainingController } from './controllers/training.controller';

@Module({
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
