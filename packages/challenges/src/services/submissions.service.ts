import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateSubmissionParams {
  repository: string;
  challengeId: string;
}
@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  async listSubmissions() {
    const submissions = await this.prisma.submission.findMany();

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

  // async getSubmissionsByChallengeId(challengeId: string) {
  //   const challenge = await this.prisma.challenge.findUnique({
  //     where: {
  //       id: challengeId,
  //     },
  //   });

  //   return challenge;
  // }

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

    return submission;
  }
}
