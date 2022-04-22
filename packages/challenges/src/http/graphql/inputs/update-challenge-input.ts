import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateChallengeInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
