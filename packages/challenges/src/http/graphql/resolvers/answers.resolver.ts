import {
  Query,
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AnswersService } from '../../../services/answers.service';
import { ChallengesService } from '../../../services/challenges.service';
import { CreateAnswerInput } from '../inputs/create-answer-input';
import { ListAnswersInput } from '../inputs/list-answers-input';
import { Answer } from '../models/answer';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(
    private answersService: AnswersService,
    private challengesService: ChallengesService,
  ) {}

  @Query(() => [Answer])
  answers(@Args('filter') filter: ListAnswersInput) {
    return this.answersService.listAnswers(filter);
  }

  @Mutation(() => Answer)
  answerChallenge(@Args('data') data: CreateAnswerInput) {
    return this.answersService.createAnswer(data);
  }

  @ResolveField()
  challenge(@Parent() answer: Answer) {
    if (!answer.challengeId) {
      return null;
    }

    return this.challengesService.getChallengeById(answer.challengeId);
  }
}
