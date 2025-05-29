const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
  isPremium: { type: Boolean, default: false },
  projects: { type: [String], default: [] },
  settings: {
    theme: { type: String, default: 'light' },
    autosave: { type: Boolean, default: true },
    language: { type: String, default: 'en' }
  }
});

module.exports = mongoose.model('Users', userSchema);
