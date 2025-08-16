import { createZodDto } from '@anatine/zod-nestjs';
import { GetSessionFilterRequestSchema } from '@kochkadev/kochka-contracts';

export class GetSessionFilterRequest extends createZodDto(
  GetSessionFilterRequestSchema,
) {}
