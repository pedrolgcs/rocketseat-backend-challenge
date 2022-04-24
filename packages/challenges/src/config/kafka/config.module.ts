import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { KafkaConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        KAFKA_BROKERS: Joi.string().required('KAFKA_BROKERS is required'),
      }),
    }),
  ],
  providers: [ConfigService, KafkaConfigService],
  exports: [ConfigService, KafkaConfigService],
})
export class KafkaConfigModule {}
