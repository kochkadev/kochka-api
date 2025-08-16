import { createZodDto } from '@anatine/zod-nestjs';
import { AddExerciseToTrainingRequestSchema } from '@kochkadev/kochka-contracts';

export class AddExerciseToTrainingRequest extends createZodDto(
  AddExerciseToTrainingRequestSchema,
) {}
