import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ExerciseService } from '../services/exercise.service';
import { CreateExerciseRequest } from '../dto/create-exercise-request.dto';
import { ExerciseResponse } from '../dto/exercise-response.dto';
import { UpdateExerciseRequest } from '../dto/update-exercise-request.dto';

@Controller('exercise')
@ApiTags('Exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @ApiOperation({ summary: 'Create new exercise' })
  @ApiCreatedResponse({ type: ExerciseResponse })
  async create(@Body() dto: CreateExerciseRequest): Promise<ExerciseResponse> {
    return this.exerciseService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit an exercise' })
  @ApiOkResponse({ type: ExerciseResponse })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateExerciseRequest,
  ): Promise<ExerciseResponse> {
    return this.exerciseService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an exercise' })
  @ApiOkResponse({ description: 'Success' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.exerciseService.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of exercises' })
  @ApiOkResponse({ type: ExerciseResponse, isArray: true })
  async getByMany(): Promise<ExerciseResponse[]> {
    return this.exerciseService.getMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an exercise by ID' })
  @ApiOkResponse({ type: ExerciseResponse })
  async getByid(@Param('id') id: string): Promise<ExerciseResponse> {
    return this.exerciseService.getById(id);
  }
}
