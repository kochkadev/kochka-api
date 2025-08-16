import { PrismaService } from '@database';
import { IAddExerciseToTrainingRequest } from '@kochkadev/kochka-contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainingExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async addExerciseToTraining(
    trainingId: string,
    data: IAddExerciseToTrainingRequest,
  ) {
    return this.prisma.trainingExercise.create({
      data: { ...data, trainingId },
    });
  }

  async deleteExerciseFromTraining(id: string) {
    await this.prisma.trainingExercise.delete({ where: { id } });
  }
}
