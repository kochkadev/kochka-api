import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TrainingExerciseService } from '../services/training-exercise.service';
import { AddExerciseToTrainingRequest } from '../dto/add-exercise-to-training-request.dto';
import { TrainingExericseDto } from '../dto/training-exericse.dto';

@Controller('training-exercise')
@ApiTags('Training Exericse')
export class TrainingExerciseController {
  constructor(
    private readonly trainingExerciseService: TrainingExerciseService,
  ) {}

  @Post(':trainingId')
  @ApiOperation({ summary: 'Add an exercise to training' })
  @ApiCreatedResponse({ type: TrainingExericseDto })
  async add(
    @Param('trainingId', ParseUUIDPipe) trainingId: string,
    @Body() dto: AddExerciseToTrainingRequest,
  ): Promise<TrainingExericseDto> {
    return this.trainingExerciseService.addExerciseToTraining(trainingId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an exercise from training' })
  @ApiOkResponse({ description: 'Success' })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.trainingExerciseService.deleteExerciseFromTraining(id);
  }
}
