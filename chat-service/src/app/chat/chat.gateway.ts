import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
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
