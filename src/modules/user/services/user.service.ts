import { PrismaService } from '@database';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import {
  USER_ALREADY_EXISTS_ERROR,
  USER_NOT_FOUND_ERROR,
} from '../../../constants/errors';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { SALT_ROUNDS } from '../../../config/global.config';
import { SafeUser } from '../../../types/safe-user.type';
import { CreateUserData } from '../types/create-user-data.type';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(dto: CreateUserData): Promise<SafeUser> {
    const { password, ...loginData } = dto;
    await this.throwErrorIfUserExist(loginData);
    const passwordHash = await this.hash(password);
    return this.prisma.user.create({
      data: { ...loginData, passwordHash },
      omit: { passwordHash: true },
    });
  }

  async throwErrorIfUserExist(params: Omit<CreateUserData, 'password'>) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: Object.keys(params).map((field) => {
          const where: Prisma.UserWhereInput = {};
          where[field] = params[field];
          return where;
        }),
      },
    });
    if (user) {
      throw new BadRequestException(USER_ALREADY_EXISTS_ERROR);
    }
  }

  private async hash(str: string): Promise<string> {
    const saltRounds = this.configService.get(SALT_ROUNDS) as number;
    const hash = await bcrypt.hash(str, saltRounds);
    return hash;
  }

  async getUserOrThrow(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }
    return user;
  }
}
