import { createZodDto } from '@anatine/zod-nestjs';
import { TrainingExerciseSchema } from '@kochkadev/kochka-contracts';

export class TrainingExericseDto extends createZodDto(TrainingExerciseSchema) {}
