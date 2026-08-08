import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AI_KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'ai-service-producer',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'ai-service-producer-group',
          },
        },
      },
    ]),
  ],

  exports: [ClientsModule],
})
export class KafkaModule {}
