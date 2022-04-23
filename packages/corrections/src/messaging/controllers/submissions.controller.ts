import { Controller } from '@nestjs/common';
import { Payload, EventPattern } from '@nestjs/microservices';
import { KafkaService } from '../kafka.service';

interface CorrectLessonMessagePayload {
  submissionId: string;
  repositoryUrl: string;
}

@Controller()
export class SubmissionsController {
  constructor(private kafka: KafkaService) {}

  @EventPattern('challenge.correction')
  correctLesson(@Payload('value') payload: CorrectLessonMessagePayload) {
    const { submissionId, repositoryUrl } = payload;

    const lessonCorrected = {
      submissionId,
      repositoryUrl,
      grade: Math.floor(Math.random() * 10) + 1,
      status: 'DONE',
    };

    return this.kafka.emit('correction.finished', lessonCorrected);
  }
}
