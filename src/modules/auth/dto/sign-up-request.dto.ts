import { createZodDto } from '@anatine/zod-nestjs';
import { SignUpRequestSchema } from '@kochkadev/kochka-contracts';

export class SignUpRequestDto extends createZodDto(SignUpRequestSchema) {}
