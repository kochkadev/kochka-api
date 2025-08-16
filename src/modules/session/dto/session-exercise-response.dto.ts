import { createZodDto } from '@anatine/zod-nestjs';
import { SessionExerciseResponseSchema } from '@kochkadev/kochka-contracts';

export class SessionExerciseResponse extends createZodDto(
  SessionExerciseResponseSchema,
) {}
