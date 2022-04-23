import { resolve } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from '../database/database.module';
import { MessagingModule } from '../messaging/messaging.module';
import { ChallengesResolver } from './graphql/resolvers/challenges.resolver';
import { AnswersResolver } from './graphql/resolvers/answers.resolver';
import { ChallengesService } from '../services/challenges.service';
import { AnswersService } from '../services/answers.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    ChallengesResolver,
    AnswersResolver,

    // Services
    ChallengesService,
    AnswersService,
  ],
})
export class HttpModule {}
