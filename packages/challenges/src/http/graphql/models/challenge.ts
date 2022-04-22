import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Submission } from './submission';

@ObjectType()
export class Challenge {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => [Submission])
  submissions: Submission[];
}
