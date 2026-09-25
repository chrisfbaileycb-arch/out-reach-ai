const mongoose = require('mongoose');

// Business Schema
const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['food', 'personal', 'home', 'retail', 'health', 'pets'],
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  contact: {
    email: String,
    phone: String,
    website: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Customer Schema
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  visitHistory: [{
    date: Date,
    amount: Number,
    services: [String],
  }],
  preferences: [String],
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Campaign Schema
const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['acquisition', 'loyalty', 'event', 'promotion'],
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,
  },
  template: {
    subject: String,
    body: String,
  },
  targetAudience: {
    criteria: [String],
    tags: [String],
  },
  scheduled: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'running', 'completed', 'paused'],
    default: 'draft',
  },
  metrics: {
    sent: Number,
    opened: Number,
    clicked: Number,
    converted: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  },
  role: {
    type: String,
    enum: ['owner', 'staff'],
    default: 'owner',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Business = mongoose.model('Business', businessSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Campaign = mongoose.model('Campaign', campaignSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Business,
  Customer,
  Campaign,
  User,
};