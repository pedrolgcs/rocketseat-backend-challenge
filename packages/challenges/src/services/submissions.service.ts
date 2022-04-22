import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { KafkaService } from '../messaging/kafka.service';

interface ListSubmissionsParams {
  challengeId?: string;
  dateStart?: Date;
  dateEnd?: Date;
  status?: 'PENDING' | 'DONE' | 'ERROR';
  page?: number;
  perPage?: number;
}

interface CreateSubmissionParams {
  repository: string;
  challengeId: string;
}
@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService, private kafka: KafkaService) {}

  async listSubmissions(filters: ListSubmissionsParams) {
    const {
      challengeId,
      status,
      page = 1,
      perPage = 10,
      dateStart,
      dateEnd,
    } = filters;

    const submissions = await this.prisma.submission.findMany({
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

    return submissions;
  }

  async getSubmissionsByChallengeId(challengeId: string) {
    const submissions = await this.prisma.submission.findMany({
      where: {
        challengeId,
      },
    });

    return submissions;
  }

  async createSubmission(data: CreateSubmissionParams) {
    const { repository, challengeId } = data;

    const repositoryURL = repository.replace(/\.git$/, '');

    const validURL = /^http.:\/\/github\.com\/[a-z-]+\/[a-z-]+$/.test(
      repositoryURL,
    );

    if (!validURL) {
      await this.prisma.submission.create({
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
      await this.prisma.submission.create({
        data: {
          repository,
          status: 'ERROR',
        },
      });

      throw new Error('Challenge not found');
    }

    const gitUrl = `${repositoryURL}.git`;

    const submission = await this.prisma.submission.create({
      data: {
        repository: gitUrl,
        challengeId,
      },
    });

    // Send kafka message
    this.kafka.emit('challenge.correction', {
      submissionId: submission.id,
      repositoryUrl: submission.repository,
    });

    return submission;
  }
}
