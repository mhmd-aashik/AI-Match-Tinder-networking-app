import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchEventsController } from './events/match-events.controller.ts';

@Module({
  imports: [],
  controllers: [AppController, MatchEventsController],
  providers: [AppService],
})
export class AppModule {}
