import { Controller, Inject } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDB } from '../database/database.module';
import { EventPattern, Payload } from '@nestjs/microservices';
import { aiIcebreakers, conversations } from '../database';

@Controller()
export class AiEventsController {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly drizzleDb: DrizzleDB,
  ) {}

  @EventPattern('ai.icebreaker.generated')
  async handleIcebreakerGenerated(
    @Payload()
    event: {
      matchId: string;
      userOneId: string;
      userTwoId: string;
      icebreaker: string;
      generatedAt: string;
    },
  ) {
    const [saved] = await this.drizzleDb
      .insert(aiIcebreakers)
      .values({
        matchId: event.matchId,
        content: event.icebreaker,
      })
      .returning();

    console.log('AI icebreaker saved', saved);
  }

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
