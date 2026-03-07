const users = new Map(); // Maps userId -> socketId

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // 1. Identify User: When a user logs in, they "join" with their ID
  socket.on('identify', (userId) => {
    users.set(userId, socket.id);
    console.log(`User ${userId} is now reachable at ${socket.id}`);
  });

  // 2. Route Encrypted Message
  socket.on('private_message', ({ to, from, encryptedPackage }) => {
    const recipientSocketId = users.get(to);
    
    if (recipientSocketId) {
      // Forward the "locked box" to the recipient
      io.to(recipientSocketId).emit('new_message', {
        from,
        encryptedPackage, // Contains ep, ek, iv, tag
        timestamp: new Date()
      });
    } else {
      // Handle offline logic (e.g., push notification or save to DB for later)
      console.log(`Recipient ${to} is offline.`);
    }
  });

  socket.on('disconnect', () => {
    // Clean up mapping on disconnect
    for (let [userId, socketId] of users.entries()) {
      if (socketId === socket.id) {
        users.delete(userId);
        break;
      }
    }
  });
});
                                 
