const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/jwtConfig');
const user = require('../models/userModel');

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email && !user.checkEmailDomain(email)) {
    return res.status(403).json({ message: 'Invalid email or email domain' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(403).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true }).json({ message: 'Logged in successfully!' });
};

// Protected route function
exports.protected = (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
};

// Logout function
exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully!' });
};
