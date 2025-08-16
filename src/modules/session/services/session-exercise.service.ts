import { PrismaService } from '@database';
import { ISaveSessionExerciseRequest } from '@kochkadev/kochka-contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async saveExercise(data: ISaveSessionExerciseRequest) {
    return this.prisma.sessionExercise.upsert({
      where: {
        sessionId_trainingExerciseId_set: {
          sessionId: data.sessionId,
          trainingExerciseId: data.trainingExerciseId,
          set: data.set,
        },
      },
      create: data,
      update: data,
    });
  }
}
