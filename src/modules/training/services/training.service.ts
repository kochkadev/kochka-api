import { PrismaService } from '@database';
import {
  ICreateTrainingRequest,
  ITrainingResponse,
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

  async delete(id: string) {
    await this.prisma.training.delete({ where: { id } });
  }

  async getMany() {
    return this.prisma.training.findMany();
  }

  async getTrainingResponse(id: string): Promise<ITrainingResponse> {
    const { exercises, ...training } =
      await this.prisma.training.findFirstOrThrow({
        where: { id },
        include: { exercises: { include: { exercise: true } } },
      });
    return {
      ...training,
      exercises: exercises.map(({ exercise }) => exercise),
    };
  }
}
