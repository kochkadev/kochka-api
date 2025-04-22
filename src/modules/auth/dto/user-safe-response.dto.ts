import { createZodDto } from '@anatine/zod-nestjs';
import { UserSafeResponseSchema } from '@kochkadev/kochka-contracts';

export class UserSafeResponseDto extends createZodDto(UserSafeResponseSchema) {}
