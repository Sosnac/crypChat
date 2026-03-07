#!/bin/bash

echo "🛡️  Initializing crypChat Project Scaffolding..."
echo "------------------------------------------------"

# 1. Create Directory Structure
mkdir -p backend/src frontend

# ---------------------------------------------------------
# 2. BACKEND SETUP (Node.js + Express + Socket.io)
# ---------------------------------------------------------
echo "📦 Setting up Backend..."
cd backend

cat << 'EOF' > package.json
{
  "name": "crypchat-backend",
  "version": "1.0.0",
  "description": "Secure E2EE Backend for crypChat",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.7.2",
    "mongoose": "^7.5.0",
    "dotenv": "^16.3.1",
    "jsonwebtoken": "^9.0.1",
    "cors": "^2.8.5",
    "bcryptjs": "^2.4.3",
    "cloudinary": "^1.40.0"
  }
}
EOF

# Create a basic entry point
cat << 'EOF' > src/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get('/', (req, res) => res.send('crypChat API is Running... 🛡️'));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('disconnect', () => console.log('User disconnected'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server locked and loaded on port ${PORT}`));
EOF

# Create .env template
cat << 'EOF' > .env
PORT=5000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_URL=your_cloudinary_url_here
EOF

cd ..

# ---------------------------------------------------------
# 3. FRONTEND SETUP (React Native / Expo)
# ---------------------------------------------------------
echo "📱 Setting up Frontend (Expo)..."
cd frontend

cat << 'EOF' > package.json
{
  "name": "crypchat-frontend",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.3",
    "socket.io-client": "^4.7.2",
    "react-navigation/native": "^6.1.7",
    "expo-secure-store": "~12.3.1",
    "react-native-get-random-values": "~1.9.0"
  }
}
EOF

cd ..

# ---------------------------------------------------------
# 4. DOCUMENTATION (README & CONTRIBUTING)
# ---------------------------------------------------------
echo "📝 Generating Professional Documentation..."

cat << 'EOF' > README.md
<h1 align="center">crypChat 🛡️</h1>
<p align="center"><strong>Privacy-first social networking. No emails. No phone numbers. Just code.</strong></p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg">
  <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
  <img alt="React Native" src="https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB">
</p>

## 🚀 Features
* **Zero-PII Auth:** Anonymous registration.
* **E2EE Messaging:** RSA-2048 & AES-256-GCM.
* **Real-time Calls:** WebRTC powered.
* **Full Control:** Encrypted local backups.

## 🛠️ Tech Stack
* **Frontend:** React Native (Expo)
* **Backend:** Node.js, Express, Socket.io, MongoDB
* **Storage:** Cloudinary

## 📦 Quick Start
1. `cd backend && npm install && npm start`
2. `cd frontend && npm install && npm start`

## 📞 Contact
**Author:** David Sosnac  
**Email:** sosnacdavid@gmail.com  
**WhatsApp:** [+260951701106](https://wa.me/260951701106)
EOF

cat << 'EOF' > CONTRIBUTING.md
# Contributing to crypChat 🛡️
1. Fork it.
2. Create your branch (`git checkout -b feature/fooBar`).
3. Commit changes (`git commit -am 'Add fooBar'`).
4. Push to branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.
EOF

# ---------------------------------------------------------
# 5. FINISH
# ---------------------------------------------------------
echo "------------------------------------------------"
echo "✅ SUCCESS: crypChat project structure is ready!"
echo "👉 Next steps:"
echo "   1. Run 'npm install' in both /backend and /frontend folders."
echo "   2. Update the .env file in the /backend folder."
echo "   3. Happy coding, David! 💪🏾🔥"
