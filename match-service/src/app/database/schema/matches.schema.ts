import { pgTable, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

export const matches = pgTable(
  'matches',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    userOneId: uuid('user_one_id').notNull(),

    userTwoId: uuid('user_two_id').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('unique_match').on(table.userOneId, table.userTwoId)],
);
