import { createZodDto } from '@anatine/zod-nestjs';
import { SessionResponseSchema } from '@kochkadev/kochka-contracts';

export class SessionResponse extends createZodDto(SessionResponseSchema) {}
