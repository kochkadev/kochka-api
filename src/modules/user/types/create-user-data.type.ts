import { Prisma } from '@prisma/client';

export type CreateUserData = Pick<
  Prisma.UserUncheckedCreateInput,
  'username'
> & { password: string };
