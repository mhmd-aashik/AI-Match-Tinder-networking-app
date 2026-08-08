import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchEventsController } from './events/match-events.controller';
import { AiService } from './ai/ai.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'ai-service/.env',
    }),
  ],
  controllers: [AppController, MatchEventsController],
  providers: [AppService, AiService],
})
export class AppModule {}
