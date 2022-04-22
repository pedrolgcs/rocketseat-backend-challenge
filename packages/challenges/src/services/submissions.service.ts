import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async getSubmissionsByChallengeId(challengeId: string) {
    const submissions = await this.prisma.submission.findMany({
      where: { challengeId },
    });

    return submissions;
  }
}
