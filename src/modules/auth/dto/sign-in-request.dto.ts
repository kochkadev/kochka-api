import { createZodDto } from '@anatine/zod-nestjs';
import { SignInRequestSchema } from '@kochkadev/kochka-contracts';

export class SignInRequestDto extends createZodDto(SignInRequestSchema) {}
