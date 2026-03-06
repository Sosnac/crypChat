# crypChat
A  Decentralized Social App Project 
Building a social application like crypChat is an exciting project. Because I want to avoid collecting emails or phone numbers, we will focus on a decentralized or unique-ID-based authentication system and use WebRTC for real-time communication.
Overview of the Solution
To build crypChat, I will use a modern tech stack:
Frontend: React Native (for iOS/Android) or React (Web).
Backend: Node.js with Express.
Database: MongoDB (to store usernames, hashed passwords, and posts).
Real-time Communication: Socket.io (for text/status updates) and WebRTC (for voice/video calls).
Storage: Cloudinary or AWS S3 (for voice notes and status media).
Step 1: Authentication Logic (No Email/Phone)
Since we aren't using traditional contact methods, the username becomes the primary key.

Step 2: Implementation of Core Features
1. Real-time Messaging & Voice Notes
We use Socket.io for instant text delivery. For voice notes, the app records audio, uploads the file to a server, and sends the URL via the socket.
2. Video & Voice Calls (WebRTC)
WebRTC allows peer-to-peer communication. You will need a STUN/TURN server to help users connect through firewalls.
Signaling: The server tells User B that User A is calling.
Stream: The browser/app captures getUserMedia() and sends the stream to the peer.
3. Status Updates (24-hour Expiry)
To make statuses disappear, we use a TTL (Time To Live) index in MongoDB.
