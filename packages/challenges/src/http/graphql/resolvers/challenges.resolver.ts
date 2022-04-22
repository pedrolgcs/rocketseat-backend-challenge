import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChallengesService } from '../../../services/challenges.service';
import { Challenge } from '../models/challenge';
import { CreateChallengeInput } from '../inputs/create-challenge-input';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private challengesService: ChallengesService) {}

  @Query(() => String)
  challenges() {
    return 'Challenge';
  }

  @Mutation(() => Challenge)
  createChallenge(@Args('data') data: CreateChallengeInput) {
    return this.challengesService.createChallenge(data);
  }
}
