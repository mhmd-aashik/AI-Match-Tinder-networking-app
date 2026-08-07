import {
  pgEnum,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const swipeActionEnum = pgEnum('swipe_action', ['like', 'pass']);

export const swipes = pgTable(
  'swipe',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    swiperUserId: uuid('swiper_user_id').notNull(),
    targetUserId: uuid('target_user_id').notNull(),
    action: swipeActionEnum('action').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('unique_swipe').on(table.swiperUserId, table.targetUserId),
  ],
);
