import { PrismaService } from '@database';
import {
  ICreateTrainingRequest,
  IUpdateTrainingRequest,
} from '@kochkadev/kochka-contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ICreateTrainingRequest) {
    return this.prisma.training.create({ data });
  }

  async update(id: string, data: IUpdateTrainingRequest) {
    return this.prisma.training.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.training.delete({ where: { id } });
  }

  async getMany() {
    return this.prisma.training.findMany();
  }

  async getTrainingResponse(id: string) {
    return this.prisma.training.findFirstOrThrow({
      where: { id },
      include: {
        exercises: {
          omit: {
            trainingId: true,
            exerciseId: true,
            createdAt: true,
            updatedAt: true,
          },
          include: {
            exercise: { omit: { createdAt: true, updatedAt: true } },
          },
        },
      },
    });
  }
}
