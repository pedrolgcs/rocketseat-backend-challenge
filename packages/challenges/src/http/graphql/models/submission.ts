import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Challenge } from './challenge';

enum SubmissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'DONE',
  FAILED = 'ERROR',
}

registerEnumType(SubmissionStatus, {
  name: 'SubmissionStatus',
  description: 'The status of the submission',
});

@ObjectType()
export class Submission {
  @Field(() => ID)
  id: string;

  @Field()
  repository: string;

  @Field(() => SubmissionStatus)
  status: SubmissionStatus;

  @Field({ nullable: true })
  grade: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Challenge, { nullable: true })
  challenge: Challenge;
  challengeId: string;
}
