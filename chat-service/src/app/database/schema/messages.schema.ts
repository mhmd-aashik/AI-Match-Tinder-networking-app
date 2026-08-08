import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { conversations } from './conversations.schema';

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  conversationId: uuid('conversation_id')
    .notNull()
    .references(() => conversations.id, {
      onDelete: 'cascade',
    }),
  senderUserId: uuid('sender_user_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
