import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDB } from '../database/database.module';
import { CreateSwipeInput } from './dto/create-swipe.input';
import { matches, swipes } from '../database';
import { and, eq } from 'drizzle-orm';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class MatchService {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly drizzleDb: DrizzleDB,

    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async createSwipe(swiperUserId: string, input: CreateSwipeInput) {
    const [swipe] = await this.drizzleDb
      .insert(swipes)
      .values({
        swiperUserId,
        targetUserId: input.targetUserId,
        action: input.action as 'like' | 'pass',
      })
      .onConflictDoUpdate({
        target: [swipes.swiperUserId, swipes.targetUserId],
        set: {
          action: input.action as 'like' | 'pass',
          createdAt: new Date(),
        },
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

    const [userOneId, userTwoId] = [swiperUserId, input.targetUserId].sort();

    const [match] = await this.drizzleDb
      .insert(matches)
      .values({
        userOneId,
        userTwoId,
      })
      .onConflictDoNothing()
      .returning();

    if (match) {
      console.log('1. MATCH CREATED:', match);
      console.log('2. PUBLISHING match.created:', {
        matchId: match.id,
        userOneId: userOneId,
        userTwoId: userTwoId,
        createdAt: match.createdAt,
      });

      this.kafkaClient.emit('match.created', {
        matchId: match.id,
        userOneId: userOneId,
        userTwoId: userTwoId,
        createdAt: match.createdAt,
      });
      console.log('3. KAFKA EVENT PUBLISHED');
    }

    return {
      swipe,
      match,
    };
  }
}
