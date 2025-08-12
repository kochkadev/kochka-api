import { PrismaService } from '@database';
import {
  ICreateExerciseRequest,
  IUpdateExerciseRequest,
} from '@kochkadev/kochka-contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ICreateExerciseRequest) {
    return this.prisma.exercise.create({ data });
  }

  async update(id: string, data: IUpdateExerciseRequest) {
    return this.prisma.exercise.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.prisma.exercise.delete({ where: { id } });
  }

  async getById(id: string) {
    return this.prisma.exercise.findFirstOrThrow({ where: { id } });
  }

  async getMany() {
    return this.prisma.exercise.findMany();
  }
}
