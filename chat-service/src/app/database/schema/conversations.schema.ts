import { pgTable, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

export const conversations = pgTable(
  'conversations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    matchId: uuid('match_id').notNull(),
    userOneId: uuid('user_one_id').notNull(),
    userTwoId: uuid('user_two_id').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('unique_match_conversation').on(table.matchId)],
);
