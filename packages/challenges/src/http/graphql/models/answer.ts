import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Challenge } from './challenge';

enum AnswerStatus {
  PENDING = 'PENDING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

registerEnumType(AnswerStatus, {
  name: 'AnswerStatus',
  description: 'The status of the answer',
});

@ObjectType()
export class Answer {
  @Field(() => ID)
  id: string;

  @Field()
  repository: string;

  @Field(() => AnswerStatus)
  status: AnswerStatus;

  @Field({ nullable: true })
  grade: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Challenge, { nullable: true })
  challenge: Challenge;
  challengeId: string;
}
