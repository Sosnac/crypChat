// --- Server Side (Node.js) ---
io.on('connection', (socket) => {
  // When recipient receives the message
  socket.on('message_delivered', (data) => {
    io.to(data.senderId).emit('update_status', { msgId: data.msgId, status: 'delivered' });
  });

  // When recipient opens the chat
  socket.on('message_seen', (data) => {
    io.to(data.senderId).emit('update_status', { msgId: data.msgId, status: 'seen' });
  });
});

// --- Client Side (React Native) ---
// Inside your Chat window:
useEffect(() => {
  if (isWindowFocused) {
    socket.emit('message_seen', { msgId: lastMessageId, senderId: contactId });
  }
}, [isWindowFocused]);

const renderStatus = (status) => {
  if (status === 'sent') return <Text>✓</Text>;
  if (status === 'delivered') return <Text>✓✓</Text>;
  if (status === 'seen') return <Text style={{color: 'blue'}}>✓✓</Text>;
};
