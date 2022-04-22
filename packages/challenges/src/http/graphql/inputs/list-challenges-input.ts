import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListChallengesInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  perPage: number;
}
