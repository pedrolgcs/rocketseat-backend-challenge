import { Controller } from '@nestjs/common';
import { Payload, EventPattern } from '@nestjs/microservices';
import { AnswersService } from '../../services/answers.service';

interface AnswersMessagePayload {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'PENDING' | 'ERROR' | 'DONE';
}

@Controller()
export class AnswersController {
  constructor(private answersService: AnswersService) {}

  @EventPattern('correction.finished')
  async correctLesson(@Payload('value') payload: AnswersMessagePayload) {
    return this.answersService.updateAnswer(payload.submissionId, {
      grade: payload.grade,
      status: payload.status,
    });
  }
}
