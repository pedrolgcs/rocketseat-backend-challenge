import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChallengesService } from '../../../services/challenges.service';
import { Challenge } from '../models/challenge';
import {
  CreateChallengeInput,
  UpdateChallengeInput,
} from '../inputs/create-challenge-input';

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
}
