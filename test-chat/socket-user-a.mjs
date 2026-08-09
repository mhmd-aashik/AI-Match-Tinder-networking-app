import { io } from 'socket.io-client';

const socket = io('http://localhost:3004');

const conversationId = '167e22b8-185f-4eb7-8625-55be95f741ab';

const userId = '55f9375d-f5f1-4509-8ffb-8e74a018046b';

socket.on('connect', () => {
  console.log('🟢 User A connected:', socket.id);

  socket.emit('joinConversation', {
    conversationId,
  });
});

socket.on('conversationJoined', () => {
  console.log('✅ User A joined conversation');
});

socket.on('messageReceived', (message) => {
  console.log('📩 User A received:', message);
});

// Type this later from code if you want A to send:
// socket.emit('sendMessage', {
//   conversationId,
//   senderUserId: userId,
//   content: 'Hello User B!',
// });
