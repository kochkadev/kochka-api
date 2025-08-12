import { createZodDto } from '@anatine/zod-nestjs';
import { UpdateExerciseRequestSchema } from '@kochkadev/kochka-contracts';

export class UpdateExerciseRequest extends createZodDto(
  UpdateExerciseRequestSchema,
) {}
