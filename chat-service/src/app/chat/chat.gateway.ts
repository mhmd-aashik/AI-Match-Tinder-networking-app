import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  // server: Server;
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
}
