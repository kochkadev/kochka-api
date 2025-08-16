import { PrismaService } from '@database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrInitSession(userId: string, trainingId: string) {
    const lastSession = await this.getLastSession(userId, trainingId);
    if (lastSession && !lastSession.finishAt) return lastSession;
    return this.initSession(userId, trainingId);
  }

  async initSession(userId: string, trainingId: string) {
    return this.prisma.session.create({
      data: { userId, trainingId },
      omit: { trainingId: true },
      include: {
        training: { select: { id: true, title: true } },
        exercises: {
          omit: { sessionId: true, createdAt: true, updatedAt: true },
        },
      },
    });
  }

  async getLastSession(userId: string, trainingId?: string) {
    return this.prisma.session.findFirst({
      where: { userId, trainingId },
      orderBy: { startedAt: 'desc' },
      omit: { trainingId: true },
      include: {
        training: { select: { id: true, title: true } },
        exercises: {
          omit: { sessionId: true, createdAt: true, updatedAt: true },
        },
      },
    });
  }

  async getUserSessionList(userId: string, trainingId?: string) {
    return this.prisma.session.findMany({
      where: { userId, trainingId },
      orderBy: { startedAt: 'desc' },
      omit: { trainingId: true },
      include: {
        training: { select: { id: true, title: true } },
        exercises: {
          omit: { sessionId: true, createdAt: true, updatedAt: true },
        },
      },
    });
  }
}
