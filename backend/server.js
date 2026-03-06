const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Database Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"));

io.on('connection', (socket) => {
    // Signaling for Video/Voice Calls
    socket.on('call-user', ({ to, offer, from }) => {
        io.to(to).emit('incoming-call', { offer, from });
    });

    socket.on('make-answer', ({ to, answer }) => {
        io.to(to).emit('call-answered', { answer });
    });

    // Room join for private messaging
    socket.on('join-chat', (username) => socket.join(username));
});

server.listen(3000, () => console.log("Server running on port 3000"));
      
