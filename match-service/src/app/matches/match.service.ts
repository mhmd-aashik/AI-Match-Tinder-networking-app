import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDB } from '../database/database.module';
import { CreateSwipeInput } from './dto/create-swipe.input';
import { swipes } from '../database';

@Injectable()
export class MatchService {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly drizzleDb: DrizzleDB,
  ) {}

  async createSwipe(swiperUserId: string, input: CreateSwipeInput) {
    const [swipe] = await this.drizzleDb
      .insert(swipes)
      .values({
        swiperUserId,
        targetUserId: input.targetUserId,
        action: input.action as 'like' | 'pass',
      })
      .returning();

    return swipe;
  }
}
