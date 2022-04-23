import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaService } from './kafka.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { AnswersController } from './controllers/answers.controller';
import { AnswersService } from '../services/answers.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AnswersController],
  providers: [PrismaService, KafkaService, AnswersService],
  exports: [KafkaService],
})
export class MessagingModule {}
