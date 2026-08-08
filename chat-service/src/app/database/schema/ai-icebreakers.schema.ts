import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const aiIcebreakers = pgTable('ai_icebreakers', {
  id: uuid('id').defaultRandom().primaryKey(),
  matchId: uuid('match_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
