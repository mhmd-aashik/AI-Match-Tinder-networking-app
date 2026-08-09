import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDB } from '../database/database.module';
import { conversations, messages } from '../database';
import { and, eq, or } from 'drizzle-orm';

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
}
