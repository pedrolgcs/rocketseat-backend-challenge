import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateChallengeParams {
  title: string;
  description: string;
}

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}

  async createChallenge({ title, description }: CreateChallengeParams) {
    const challenge = await this.prisma.challenge.create({
      data: {
        title,
        description,
      },
    });

    return challenge;
  }
}
