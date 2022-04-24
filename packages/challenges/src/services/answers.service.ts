import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { KafkaService } from '../messaging/kafka.service';

interface ListAnswersParams {
  challengeId?: string;
  dateStart?: Date;
  dateEnd?: Date;
  status?: 'PENDING' | 'DONE' | 'ERROR';
  page?: number;
  perPage?: number;
}

interface CreateAnswerParams {
  repository: string;
  challengeId: string;
}

interface UpdateAnswerParams {
  grade: number;
  status: 'PENDING' | 'DONE' | 'ERROR';
}

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

  async listAnswers(filters: ListAnswersParams) {
    const {
      challengeId,
      status,
      page = 1,
      perPage = 10,
      dateStart,
      dateEnd,
    } = filters;

    const answers = await this.prisma.answer.findMany({
      where: {
        challengeId: challengeId ? { equals: challengeId } : undefined,
        status: status ? { equals: status } : undefined,
        createdAt: {
          gte: dateStart ? dateStart : undefined,
          lte: dateEnd ? dateEnd : undefined,
        },
      },
      skip: perPage * (page - 1),
      take: perPage,
    });

    return answers;
  }

  async getAnswersByChallengeId(challengeId: string) {
    const answers = await this.prisma.answer.findMany({
      where: {
        challengeId,
      },
    });

    return answers;
  }

  async createAnswer(data: CreateAnswerParams) {
    const { repository, challengeId } = data;

    const repositoryURL = repository.replace(/\.git$/, '');

    const validURL = /^http.:\/\/github\.com\/[a-z-]+\/[a-z-]+$/.test(
      repositoryURL,
    );

    if (!validURL) {
      await this.prisma.answer.create({
        data: {
          repository,
          status: 'ERROR',
        },
      });

      throw new Error('Invalid repository URL');
    }

    const challenge = await this.prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      await this.prisma.answer.create({
        data: {
          repository,
          status: 'ERROR',
        },
      });

      throw new Error('Challenge not found');
    }

    const gitUrl = `${repositoryURL}.git`;

    const answer = await this.prisma.answer.create({
      data: {
        repository: gitUrl,
        challengeId,
      },
    });

    this.kafka.emit('challenge.correction', {
      submissionId: answer.id,
      repositoryUrl: answer.repository,
    });

    return answer;
  }

  async updateAnswer(id: string, data: UpdateAnswerParams) {
    const answer = await this.prisma.answer
      .update({
        where: { id },
        data,
      })
      .catch(() => {
        throw new Error('Answer not found');
      });

    return answer;
  }
}
