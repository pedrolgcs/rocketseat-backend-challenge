import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { MessagingModule } from './messaging/messaging.module';
import { KafkaConfigModule } from './config/kafka/config.module';

@Module({
  imports: [DatabaseModule, HttpModule, MessagingModule, KafkaConfigModule],
})
export class AppModule {}
