import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchEventsController } from './events/match-events.controller';
import { AiService } from './ai/ai.service';
import { ConfigModule } from '@nestjs/config';
import { UserProfileClient } from './users/user-profile.client';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'ai-service/.env',
    }),

    KafkaModule,
  ],
  controllers: [AppController, MatchEventsController],
  providers: [AppService, AiService, UserProfileClient],
})
export class AppModule {}
