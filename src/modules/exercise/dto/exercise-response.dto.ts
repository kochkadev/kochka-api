import { createZodDto } from '@anatine/zod-nestjs';
import { CreateExerciseRequestSchema } from '@kochkadev/kochka-contracts';

export class ExerciseResponse extends createZodDto(
  CreateExerciseRequestSchema,
) {}
