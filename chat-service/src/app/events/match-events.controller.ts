import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { conversations } from '../database';
import { DRIZZLE_DB, type DrizzleDB } from '../database/database.module';

@Controller()
export class MatchEventsController {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly drizzleDb: DrizzleDB,
  ) {}

  @EventPattern('match.created')
  async handleMatchCreated(
    @Payload()
    event: {
      matchId: string;
      userOneId: string;
      userTwoId: string;
      createdAt: string;
    },
  ) {
    const [conversation] = await this.drizzleDb
      .insert(conversations)
      .values({
        matchId: event.matchId,
        userOneId: event.userOneId,
        userTwoId: event.userTwoId,
      })
      .onConflictDoNothing()
      .returning();

    if (conversation) {
      console.log('Conversation created:', conversation.id);
    }
  }
}
