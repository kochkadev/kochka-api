import { createZodDto } from '@anatine/zod-nestjs';
import { CreateExerciseRequestSchema } from '@kochkadev/kochka-contracts';

export class CreateExerciseRequest extends createZodDto(
  CreateExerciseRequestSchema,
) {}
