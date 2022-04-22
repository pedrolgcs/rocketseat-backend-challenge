import { resolve } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from '../database/database.module';
import { ChallengesResolver } from './graphql/resolvers/challenges.resolver';
import { SubmissionsResolver } from './graphql/resolvers/submissions.resolver';
import { ChallengesService } from '../services/challenges.service';
import { SubmissionsService } from '../services/submissions.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    ChallengesResolver,
    SubmissionsResolver,

    // Services
    ChallengesService,
    SubmissionsService,
  ],
})
export class HttpModule {}
