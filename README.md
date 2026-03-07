## crypChat 🛡️

**Created By**: **David Sosnac**

⚡**Privacy-first social networking**. 

⚡**No emails**. 

⚡**No phone numbers**. 

⚡**Just code.**

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
1. **Clone the repo**: `git clone https://github.com/Sosnac/crypChat.git`
2. **Install Backend**: `cd backend && npm install`
3. **Install Frontend**: `cd frontend && npm install`
4. **Create a `.env` file with**`JWT_SECRET`, `MONGO_URI`, **and** `CLOUDINARY_URL`.
5. **Start**: `npm start`

## 🔒 Security Architecture
crypChat uses RSA-2048 for key exchange and AES-256-GCM for message encryption. Private keys are stored in the device's Secure Enclave.

## GENERATE CONTRIBUTING.md
---------------------------------------------------------
**echo "🤝 Writing CONTRIBUTING.md...**"
**cat << 'EOF' > CONTRIBUTING.md**
## Contributing to crypChat🛡️
First off, thank you for taking the time to contribute! 🎉
The following is a set of guidelines for contributing to **crypChat**. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.
**How Can I Contribute**?
**Reporting Bugs**
This section guides you through submitting a bug report for crypChat. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.
Use a clear and descriptive title for the issue to identify the problem.
Describe the exact steps which reproduce the problem in as many details as possible.
Describe the behavior you observed after following the steps and point out what exactly is the problem with that behavior.
Explain which behavior you expected to see instead and why.
Suggesting Enhancements
Use a clear and descriptive title for the issue to identify the suggestion.
Provide a step-by-step description of the suggested enhancement in as many details as possible.
Explain why this enhancement would be useful to most crypChat users.
Pull Requests
Fork the repo and create your branch from main.
If you've added code that should be tested, add tests.
Ensure the test suite passes.
Make sure your code lints.
Issue that pull request!
Code of Conduct
By participating in this project, you are expected to uphold a welcoming and safe environment for everyone.
**EOF**
**echo "✅ CONTRIBUTING.md created successfully!"**
echo "💪🏾🔥 All done! Your project docs are fully set up and ready to push."


## 📞 Contact

**David Sosnac - Lead Developer & Creator**

**Email: sosnacdavid@gmail.com**

**WhatsApp: +260951701106**

**GitHub: @David Sosnac**

**Project Link: https://github.com/Sosnac/crypChat**

