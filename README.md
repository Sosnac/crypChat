# crypChat 🛡️

**Created By**: **David Sosnac**

**Privacy-first social networking. No emails. No phone numbers. Just code.**

## 🚀 Features
- **Zero-PII Auth:** Register with just a username and password.
- **E2EE Messaging:** End-to-End Encryption for text and voice notes.
- **Real-time Calls:** High-quality Video/Voice calls via WebRTC.
- **Disappearing Status:** 24-hour status updates.
- **Full Control:** Group admin tools and encrypted local backups.

## 🛠️ Tech Stack
- **Frontend:** React Native (Expo)
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB (User/Posts), SQLite (Local Encrypted Chat)
- **Storage:** Cloudinary (Media)

## 📦 Installation
1. Clone the repo: `git clone https://github.com/Sosnac/crypchat.git`
2. Install Backend: `cd backend && npm install`
3. Install Frontend: `cd frontend && npm install`
4. Create a `.env` file with `JWT_SECRET`, `MONGO_URI`, and `CLOUDINARY_URL`.
5. Start: `npm start`

## 🔒 Security Architecture
crypChat uses RSA-2048 for key exchange and AES-256-GCM for message encryption. Private keys are stored in the device's Secure Enclave.

