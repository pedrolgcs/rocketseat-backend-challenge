import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListSubmissionsInput {
  @Field({ nullable: true })
  challengeId: string;

  @Field(() => Date, { nullable: true })
  dateStart: Date;

  @Field(() => Date, { nullable: true })
  dateEnd: Date;

  @Field({ nullable: true })
  status: 'PENDING' | 'DONE' | 'ERROR';

  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  perPage: number;
}
