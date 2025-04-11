import { Prisma } from "@prisma/client";

export type SafeUser = Prisma.UserGetPayload<{ omit: { passwordHash: true } }>;
