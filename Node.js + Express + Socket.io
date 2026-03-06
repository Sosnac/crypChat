const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// --- Real-time Logic ---
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Users join a "room" named after their username for private signaling
  socket.on('join_signal_room', (username) => {
    socket.join(username);
  });

  // WebRTC Signaling Handshake
  socket.on('initiate_call', ({ to, offer, from }) => {
    io.to(to).emit('incoming_call_signal', { offer, from });
  });

  socket.on('answer_call', ({ to, answer }) => {
    io.to(to).emit('call_accepted_signal', { answer });
  });

  // Text/Voice Note Delivery
  socket.on('send_chat', (data) => {
    io.to(data.receiver).emit('receive_chat', data);
  });
});

// --- API Routes (Auth & Posts) ---
app.post('/api/auth/register', async (req, res) => {
  // Logic to save username/hashed password to MongoDB
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`crypChat Backend on port ${PORT}`));
