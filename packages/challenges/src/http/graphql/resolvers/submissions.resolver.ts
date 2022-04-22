import {
  Query,
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SubmissionsService } from '../../../services/submissions.service';
import { ChallengesService } from '../../../services/challenges.service';
import { CreateSubmissionInput } from '../inputs/create-submission-input';
import { ListSubmissionsInput } from '../inputs/list-submissions-input';
import { Submission } from '../models/submission';

@Resolver(() => Submission)
export class SubmissionsResolver {
  constructor(
    private submissionsService: SubmissionsService,
    private challengesService: ChallengesService,
  ) {}

  @Query(() => [Submission])
  submissions(@Args('filter') filter: ListSubmissionsInput) {
    return this.submissionsService.listSubmissions(filter);
  }

  @Mutation(() => Submission)
  createSubmission(@Args('data') data: CreateSubmissionInput) {
    return this.submissionsService.createSubmission(data);
  }

  @ResolveField()
  challenge(@Parent() submission: Submission) {
    if (!submission.challengeId) {
      return null;
    }

    return this.challengesService.getChallengeById(submission.challengeId);
  }
}
