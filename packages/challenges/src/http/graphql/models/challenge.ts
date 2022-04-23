import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Answer } from './answer';

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

  @Field(() => [Answer])
  answers: Answer[];
}
