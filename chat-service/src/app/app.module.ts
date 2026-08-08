import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AiEventsController } from './events/ai-events.controller';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'chat-service/.env',
    }),

    DatabaseModule,
    ChatModule,
  ],
  controllers: [AppController, AiEventsController],
  providers: [AppService],
})
export class AppModule {}
