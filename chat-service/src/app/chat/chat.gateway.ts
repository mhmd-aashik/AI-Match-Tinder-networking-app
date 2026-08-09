import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { SocketAuthService } from '../auth/socket-auth.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly socketAuthService: SocketAuthService,
  ) {}

  @WebSocketServer()
  server!: Server;

  async handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth?.token ??
        client.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        client.disconnect();
        return;
      }

      const user = await this.socketAuthService.verifyToken(token);

      client.data.user = user;

      console.log('Authenticated socket user:', user.id);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('joinConversation')
  async joinConversation(
    @MessageBody()
    data: {
      conversationId: string;
    },
    @ConnectedSocket()
    client: Socket,
  ) {
    const userId = client.data.user.id;

    const conversation = await this.chatService.findConversationForUser(
      data.conversationId,
      userId,
    );

    if (!conversation) {
      client.emit('conversationError', {
        message: 'You are not part of this conversation',
      });

      return;
    }

    const room = `conversation:${data.conversationId}`;

    await client.join(room);

    client.emit('conversationJoined', {
      conversationId: data.conversationId,
    });
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody()
    data: {
      conversationId: string;
      senderUserId: string;
      content: string;
    },
  ) {
    const message = await this.chatService.createMessage(
      data.conversationId,
      data.senderUserId,
      data.content,
    );

    this.server
      .to(`conversation:${data.conversationId}`)
      .emit('messageReceived', message);

    return message;
  }
}
