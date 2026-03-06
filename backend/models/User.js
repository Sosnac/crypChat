const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Encrypted with bcrypt
  publicKey: String, // Used for E2EE message encryption
  status: { type: String, default: "Available" }
});

module.exports = mongoose.model('User', UserSchema);
