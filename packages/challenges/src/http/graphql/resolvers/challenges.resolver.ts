import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ChallengesService } from '../../../services/challenges.service';
import { AnswersService } from '../../../services/answers.service';
import { Challenge } from '../models/challenge';
import { CreateChallengeInput } from '../inputs/create-challenge-input';
import { UpdateChallengeInput } from '../inputs/update-challenge-input';
import { ListChallengesInput } from '../inputs/list-challenges-input';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(
    private challengesService: ChallengesService,
    private answersService: AnswersService,
  ) {}

  @Query(() => [Challenge])
  challenges(@Args('filter') filter: ListChallengesInput) {
    return this.challengesService.listChallenges(filter);
  }

  @Mutation(() => Challenge)
  createChallenge(@Args('data') data: CreateChallengeInput) {
    return this.challengesService.createChallenge(data);
  }

  @Mutation(() => Challenge)
  updateChallenge(
    @Args('id') id: string,
    @Args('data') data: UpdateChallengeInput,
  ) {
    return this.challengesService.updateChallenge(id, data);
  }

  @Mutation(() => Challenge)
  deleteChallenge(@Args('id') id: string) {
    return this.challengesService.deleteChallenge(id);
  }

  @ResolveField()
  answers(@Parent() challenge: Challenge) {
    return this.answersService.getAnswersByChallengeId(challenge.id);
  }
}
