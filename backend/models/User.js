const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  kidName: {
    type: String,
    required: true,
  },
  kidAge: {
    type: Number,
    required: true,
    min: 2,
    max: 5,
  },
  role: {
    type: String,
    enum: ['parent', 'admin', 'kid'],
    default: 'parent',
  },
  city: {
    type: String,
    required: true, // required for location insights
  },
  area: {
    type: String,
    required: true, // required for location insights
  },
  profileImage: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
