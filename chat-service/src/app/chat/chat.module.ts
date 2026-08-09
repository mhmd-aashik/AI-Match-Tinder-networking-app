import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { SocketAuthService } from '../auth/socket-auth.service';

@Module({
  providers: [ChatGateway, ChatService, SocketAuthService],
})
export class ChatModule {}
