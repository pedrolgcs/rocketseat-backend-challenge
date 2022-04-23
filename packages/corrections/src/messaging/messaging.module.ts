import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaService } from './kafka.service';
import { SubmissionsController } from './controllers/submissions.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [SubmissionsController],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class MessagingModule {}
