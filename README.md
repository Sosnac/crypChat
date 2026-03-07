----------------------------------------------------------
## 🔐crypChat 🛡️
-----------------------------------------------------------

**Building A Decentralized Social App**:

Building a social application like **crypChat** is one of my exciting project. Because I want to avoid collecting emails or phone numbers, I will focus on a decentralized or unique-ID-based authentication system and use **WebRTC** for real-time communication.

**Overview of the Solution**:

To build **crypChat**, I've used a modern tech stack:

1. **Frontend**: React Native (for iOS/Android) or React (Web).

2. **Backend**: Node.js with Express.

3. **Database**: MongoDB (to store usernames, hashed passwords, and posts).

4. **Real-time Communication**: Socket.io (for text/status updates) and WebRTC (for voice/video calls).

5. **Storage**: Cloudinary (for voice notes and status media).

 **Creator**: **David Sosnac**
 
--------------------------------------------------------

## 🗝️ Privacy 

- **Privacy-first social networking**. 

- **No emails**. 

- **No phone numbers**. 

- **Just code.**

----------------------------------------------------------

## 🚀 Features
- **Zero-PII Auth:** Register with just a username and password.
- **E2EE Messaging:** End-to-End Encryption for text and voice notes.
- **Real-time Calls:** High-quality Video/Voice calls via WebRTC.
- **Disappearing Status:** 24-hour status updates.
- **Full Control:** Group admin tools and encrypted local backups.

-----------------------------------------------------------

## 🛠️ Tech Stack
- **Frontend:** React Native (Expo)
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB (User/Posts), SQLite (Local Encrypted Chat)
- **Storage:** Cloudinary (Media)

----------------------------------------------------------

## 📦 Installation
1. **Clone the repo**: `git clone https://github.com/Sosnac/crypChat.git`
2. **Install Backend**: `cd backend && npm install`
3. **Install Frontend**: `cd frontend && npm install`
4. **Create a `.env` file with**`JWT_SECRET`, `MONGO_URI`, **and** `CLOUDINARY_URL`.
5. **Start**: `npm start`

-----------------------------------------------------------

## 🔒 Security Architecture
**crypChat** uses **RSA-2048** for key exchange and **AES-256-GCM** for message encryption. Private keys are stored in the device's Secure Enclave.

---------------------------------------------------------

## Contributing to crypChat🛡️

First off, **thank you** for taking the time to contribute! 🎉
The following is a set of guidelines for contributing to **crypChat**. 
These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.


-------------------------------------------------

## 🪲Reporting Bugs

🧾 **This section guides you through submitting a bug report for crypChat**.

Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

Use a clear and descriptive title for the issue to identify the problem.

Describe the exact steps which reproduce the problem in as many details as possible.

Describe the behavior you observed after following the steps and point out what exactly is the problem with that behavior.

Explain which behavior you expected to see instead and why.

--------------------------------------------

## 🏹 Suggesting Enhancements

Use a clear and descriptive title for the issue to identify the suggestion.

Provide a step-by-step description of the suggested enhancement in as many details as possible.

Explain why this enhancement would be useful to most crypChat users.

---------------------------------------------

## 🌐 Pull Requests

Fork the repo and create your branch from main.

If you've added code that should be tested, add tests.
Ensure the test suite passes.
Make sure your code lints.
Issue that pull request!

----------------------------------------------

## 💪🏾Code of Conduct

By participating in this project, you are expected to uphold a welcoming and safe environment for everyone.
 **💪🏾🔥⚡**

--------------------------------------------------------------------

## 📞 Contact

**David Sosnac - Lead Developer & Creator**

**Email**: *sosnacdavid@gmail.com*

**Facebook**: *David Sosnac*

**GitHub**: @ *David Sosnac*

------------------------------------------------

**Project Link: https://github.com/Sosnac/crypChat**
-------------------------------------------------------

## 🔥Scaffold_cypChat.sh v1.0.0
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

-------------------------------------------------

**All rights reserved, Copyright ©2026**

--------------------------------------------

