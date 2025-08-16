import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SessionExerciseService } from '../services/session-exercise.service';
import { SaveSessionExerciseRequest } from '../dto/save-session-exercise-request.dto';
import { SessionExerciseResponse } from '../dto/session-exercise-response.dto';

@Controller('session-exercise')
@ApiTags('Session Exercise')
export class SessionExerciseController {
  constructor(
    private readonly sessionExerciseService: SessionExerciseService,
  ) {}

  @Post('save')
  @ApiOperation({ summary: 'Save exercise progress' })
  @ApiCreatedResponse({ type: SessionExerciseResponse })
  async save(
    @Body() dto: SaveSessionExerciseRequest,
  ): Promise<SessionExerciseResponse> {
    return this.sessionExerciseService.saveExercise(dto);
  }
}
