import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'challenge',
        brokers: [configService.get('KAFKA_BROKERS')],
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
