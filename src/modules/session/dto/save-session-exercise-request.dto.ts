import { createZodDto } from '@anatine/zod-nestjs';
import { SaveSessionExerciseRequestSchema } from '@kochkadev/kochka-contracts';

export class SaveSessionExerciseRequest extends createZodDto(
  SaveSessionExerciseRequestSchema,
) {}
