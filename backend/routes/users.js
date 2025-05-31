const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Utility: sanitize user object to exclude sensitive data
const sanitizeUser = (user) => ({
  _id: user._id,
  email: user.email,
  name: user.name,
  tier: user.tier,
  credits: user.credits,
  purchasedCredits: user.purchasedCredits,
  isPremium: user.isPremium,
  settings: user.settings,
  projects: user.projects,
  joinedAt: user.joinedAt,
});

// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      passwordHash,
      tier: 'free',           // default tier
      credits: 100,           // default credit allocation
      isPremium: false,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: sanitizeUser(newUser),
    });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
