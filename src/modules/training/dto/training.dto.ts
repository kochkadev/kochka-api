import { createZodDto } from '@anatine/zod-nestjs';
import { TrainingSchema } from '@kochkadev/kochka-contracts';

export class TrainingDto extends createZodDto(TrainingSchema) {}
