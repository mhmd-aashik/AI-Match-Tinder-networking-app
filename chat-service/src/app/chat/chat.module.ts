import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { SocketAuthService } from '../auth/socket-auth.service';
import { ChatResolver } from './chat.resolver';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [ChatGateway, ChatService, SocketAuthService, ChatResolver],
})
export class ChatModule {}
