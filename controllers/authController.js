const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, publicKey } = req.body;

    // 1. Check if username is taken
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Identity alias already exists." });
    }

    // 2. Create the new user with the Public Key
    user = new User({
      username,
      password,
      publicKey
    });

    await user.save();

    // 3. Generate JWT for immediate login
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        publicKey: user.publicKey
      }
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Shield server error. Try again later." });
  }
};
  
