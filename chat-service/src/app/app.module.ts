import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AiEventsController } from './events/ai-events.controller';
import { ChatModule } from './chat/chat.module';
import { MatchEventsController } from './events/match-events.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'chat-service/.env',
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'chat-service/src/app/graphql/schema.gql',
      graphiql: true,
    }),

    DatabaseModule,
    ChatModule,
  ],
  controllers: [AppController, AiEventsController, MatchEventsController],
  providers: [AppService],
})
export class AppModule {}
