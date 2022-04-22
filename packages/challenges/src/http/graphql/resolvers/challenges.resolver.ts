import { Query, Resolver } from '@nestjs/graphql';
import { Challenge } from '../models/challenge';

@Resolver(() => Challenge)
export class ChallengesResolver {
  @Query(() => String)
  challenges() {
    return 'Challenge';
  }
}
