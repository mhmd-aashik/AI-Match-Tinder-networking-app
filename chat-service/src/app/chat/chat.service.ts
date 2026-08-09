import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDB } from '../database/database.module';
import { conversations, messages } from '../database';
import { and, desc, eq, or } from 'drizzle-orm';

@Injectable()
export class ChatService {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly drizzleDb: DrizzleDB,
  ) {}

  async createMessage(
    conversationId: string,
    senderUserId: string,
    content: string,
  ) {
    const [message] = await this.drizzleDb
      .insert(messages)
      .values({
        conversationId,
        senderUserId,
        content,
      })
      .returning();

    return message;
  }

  async findConversationForUser(conversationId: string, userId: string) {
    const [conversation] = await this.drizzleDb
      .select()
      .from(conversations)
      .where(
        and(
          eq(conversations.id, conversationId),
          or(
            eq(conversations.userOneId, userId),
            eq(conversations.userTwoId, userId),
          ),
        ),
      );

    return conversation;
  }

  async findConversationById(id: string) {
    const [conversation] = await this.drizzleDb
      .select()
      .from(conversations)
      .where(eq(conversations.id, id));

    return conversation;
  }

  async findMessagesByConversationId(conversationId: string, limit = 20) {
    return this.drizzleDb
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(desc(messages.createdAt))
      .limit(limit);
  }

  async findConversationsForUser(userId: string) {
    return this.drizzleDb
      .select()
      .from(conversations)
      .where(
        or(
          eq(conversations.userOneId, userId),
          eq(conversations.userTwoId, userId),
        ),
      )
      .orderBy(desc(conversations.createdAt));
  }
}
