const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  theme: { type: String, default: 'light' },
  language: { type: String, default: 'en' },
  notifications: { type: Boolean, default: true },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },

  tier: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free'
  },

  credits: { type: Number, default: 100 },
  purchasedCredits: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false },

  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],

  settings: { type: SettingsSchema, default: () => ({}) },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
