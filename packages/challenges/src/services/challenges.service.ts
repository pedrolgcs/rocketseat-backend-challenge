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

    /* // ? Check if this is the correct way to do pagination
      const total = await this.prisma.challenge.count();

      const result = {
        challenges,
        total,
        page,
        perPage,
      }

      return result;
    */

    return challenges;
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
