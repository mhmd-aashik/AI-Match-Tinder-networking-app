import { Module } from '@nestjs/common';

import { ChatResolver } from './chat.resolver';
import { ChatServiceClient } from './chat-service.client';

@Module({
  providers: [ChatServiceClient, ChatResolver],
})
export class ChatModule {}
