import { createZodDto } from '@anatine/zod-nestjs';
import { CreateTrainingRequestSchema } from '@kochkadev/kochka-contracts';

export class CreateTrainingRequest extends createZodDto(
  CreateTrainingRequestSchema,
) {}
