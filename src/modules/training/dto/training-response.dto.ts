import { createZodDto } from '@anatine/zod-nestjs';
import { TrainingResponseSchema } from '@kochkadev/kochka-contracts';

export class TrainingResponse extends createZodDto(TrainingResponseSchema) {}
