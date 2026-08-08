import { Controller, Inject } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDB } from '../database/database.module';
import { EventPattern, Payload } from '@nestjs/microservices';
import { aiIcebreakers } from '../database';

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
}
