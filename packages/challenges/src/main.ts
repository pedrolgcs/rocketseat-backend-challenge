import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaConfigService } from './config/kafka/config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaConfig: KafkaConfigService = app.get(KafkaConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [kafkaConfig.brokers],
      },
      consumer: {
        groupId: 'correction-consumer',
      },
    },
  });

  app
    .startAllMicroservices()
    .then(() => console.log('[Challenge] Microservice started'));

  await app.listen(3331);
}

bootstrap();
