const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Handle Socket connections for Chat
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Joining a private room based on username
  socket.on('join_room', (username) => {
    socket.join(username);
  });

  // Sending a text message
  socket.on('send_message', (data) => {
    // data = { receiver: 'bob', message: 'Hello!', sender: 'alice' }
    io.to(data.receiver).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('crypChat server running on port 3000');
});
  
