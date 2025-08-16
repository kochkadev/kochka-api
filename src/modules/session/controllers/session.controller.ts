import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SessionService } from '../services/session.service';
import { GetJwtPayload } from 'src/decorators/get-jwt-payload.decorator';
import { SessionResponse } from '../dto/session-response.dto';
import { GetSessionFilterRequest } from '../dto/get-session-filter-request.dto';

@Controller('session')
@ApiTags('Session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('get-or-init')
  @ApiOperation({
    summary: 'Get last active or initialize new training session',
  })
  @ApiCreatedResponse({ type: SessionResponse })
  async getOrInitSession(
    @Param('trainingId', ParseUUIDPipe) trainingId: string,
    @GetJwtPayload('id') userId: string,
  ): Promise<SessionResponse> {
    return this.sessionService.getOrInitSession(userId, trainingId);
  }

  @Get('last-session')
  @ApiOperation({ summary: 'Get last current user last training session' })
  @ApiOkResponse({ type: SessionResponse })
  async getLastTraining(
    @GetJwtPayload('id') userId: string,
    @Query() { trainingId }: GetSessionFilterRequest,
  ): Promise<SessionResponse | null> {
    return this.sessionService.getLastSession(userId, trainingId);
  }

  @Get('list')
  @ApiOperation({ summary: 'Get a list of current user training sessions' })
  @ApiOkResponse({ type: SessionResponse, isArray: true })
  async getList(
    @GetJwtPayload('id') userId: string,
    @Query() { trainingId }: GetSessionFilterRequest,
  ) {
    return this.sessionService.getUserSessionList(userId, trainingId);
  }
}
