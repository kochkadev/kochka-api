import { createZodDto } from '@anatine/zod-nestjs';
import { UpdateTrainingRequestSchema } from '@kochkadev/kochka-contracts';

export class UpdateTrainingRequest extends createZodDto(
  UpdateTrainingRequestSchema,
) {}
