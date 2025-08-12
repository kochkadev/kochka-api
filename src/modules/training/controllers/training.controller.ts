import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TrainingService } from '../services/training.service';
import { TrainingResponse } from '../dto/training-response.dto';
import { CreateTrainingRequest } from '../dto/create-training-request.dto';
import { UpdateTrainingRequest } from '../dto/update-training-request.dto';
import { TrainingDto } from '../dto/training.dto';

@Controller('training')
@ApiTags('Training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  @ApiOperation({ summary: 'Create new training' })
  @ApiCreatedResponse({ type: TrainingResponse })
  async create(@Body() dto: CreateTrainingRequest): Promise<TrainingResponse> {
    const entity = await this.trainingService.create(dto);
    return this.trainingService.getTrainingResponse(entity.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a training' })
  @ApiOkResponse({ type: TrainingResponse })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrainingRequest,
  ): Promise<TrainingResponse> {
    const entity = await this.trainingService.update(id, dto);
    return this.trainingService.getTrainingResponse(entity.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a training' })
  @ApiOkResponse({ description: 'Success' })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.trainingService.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of trainings' })
  @ApiOkResponse({ type: TrainingDto, isArray: true })
  async getByMany(): Promise<TrainingDto[]> {
    return this.trainingService.getMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a training with exercises by ID' })
  @ApiOkResponse({ type: TrainingResponse })
  async getByid(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TrainingResponse> {
    return this.trainingService.getTrainingResponse(id);
  }
}
