import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface ListChallengesParams {
  title?: string;
  description?: string;
  page?: number;
  perPage?: number;
}

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

  async listChallenges(filters: ListChallengesParams) {
    const { title = '', description = '', page = 1, perPage = 10 } = filters;

    const challenges = await this.prisma.challenge.findMany({
      where: {
        title: { contains: title, mode: 'insensitive' },
        description: { contains: description, mode: 'insensitive' },
      },
      skip: perPage * (page - 1),
      take: perPage,
      orderBy: {
        createdAt: 'asc',
      },
    });

    return challenges;
  }

  async getChallengeById(id: string) {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id },
    });

    if (!challenge) {
      throw new Error('Challenge not found');
    }

    return challenge;
  }

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
    const challenge = await this.prisma.challenge
      .update({
        where: { id },
        data,
      })
      .catch(() => {
        throw new Error('Challenge not found');
      });

    return challenge;
  }

  async deleteChallenge(id: string) {
    const challenge = await this.prisma.challenge
      .delete({
        where: {
          id,
        },
      })
      .catch(() => {
        throw new Error('Challenge not found');
      });

    return challenge;
  }
}
