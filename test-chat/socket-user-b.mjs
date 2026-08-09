import { io } from 'socket.io-client';

const socket = io('http://localhost:3004');

const conversationId = '167e22b8-185f-4eb7-8625-55be95f741ab';

const userId = 'aa7fcc5c-28b4-4325-9f75-e45fc7d1dfb3';

socket.on('connect', () => {
  console.log('🟢 User B connected:', socket.id);

  socket.emit('joinConversation', {
    conversationId,
  });
});

socket.on('conversationJoined', () => {
  console.log('✅ User B joined conversation');

  setTimeout(() => {
    socket.emit('sendMessage', {
      conversationId,
      senderUserId: userId,
      content: 'Hello User A!',
    });
  }, 2000);
});

socket.on('messageReceived', (message) => {
  console.log('📩 User B received:', message);
});
