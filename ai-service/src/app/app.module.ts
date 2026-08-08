import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchEventsController } from './events/match-events.controller';
import { AiService } from './ai/ai.service';

@Module({
  imports: [],
  controllers: [AppController, MatchEventsController],
  providers: [AppService, AiService],
})
export class AppModule {}
