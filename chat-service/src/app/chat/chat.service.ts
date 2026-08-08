import { Injectable, Inject } from '@nestjs/common';
import { DRIZZLE_DB, type DrizzleDB } from '../database/database.module';
import { messages } from '../database';

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
}
