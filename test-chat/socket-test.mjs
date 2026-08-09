import { io } from 'socket.io-client';

const socket = io('http://localhost:3004');

const conversationId = '167e22b8-185f-4eb7-8625-55be95f741ab';

socket.on('connect', () => {
  console.log('Connected:', socket.id);

  socket.emit('joinConversation', {
    conversationId,
  });
});

socket.on('conversationJoined', (data) => {
  console.log('Joined:', data);

  socket.emit('sendMessage', {
    conversationId,
    // senderUserId: '55f9375d-f5f1-4509-8ffb-8e74a018046b',
    senderUserId: 'aa7fcc5c-28b4-4325-9f75-e45fc7d1dfb3',
    content: 'Hello from Socket.IO test! How are you?',
  });
});

socket.on('messageReceived', (message) => {
  console.log('Message received:', message);
});
