import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateChallengeParams {
  title: string;
  description: string;
}

interface UpdateChallengeParams {
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

  async updateChallenge(id: string, data: UpdateChallengeParams) {
    const challenge = await this.prisma.challenge.update({
      where: { id },
      data,
    });

    return challenge;
  }

  async deleteChallenge(id: string) {
    const challenge = await this.prisma.challenge.delete({
      where: {
        id,
      },
    });

    return challenge;
  }
}
