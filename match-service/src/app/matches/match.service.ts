import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDB } from '../database/database.module';
import { CreateSwipeInput } from './dto/create-swipe.input';
import { matches, swipes } from '../database';
import { and, eq } from 'drizzle-orm';

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

    if (input.action !== 'like') {
      return {
        swipe,
        match: null,
      };
    }

    const [reverseLike] = await this.drizzleDb
      .select()
      .from(swipes)
      .where(
        and(
          eq(swipes.swiperUserId, input.targetUserId),
          eq(swipes.targetUserId, swiperUserId),
          eq(swipes.action, 'like'),
        ),
      );

    if (!reverseLike) {
      return {
        swipe,
        match: null,
      };
    }

    const [match] = await this.drizzleDb
      .insert(matches)
      .values({
        userOneId: swiperUserId,
        userTwoId: input.targetUserId,
      })
      .returning();

    return {
      swipe,
      match,
    };
  }
}
