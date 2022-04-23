import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field()
  repository: string;

  @Field()
  challengeId: string;
}
