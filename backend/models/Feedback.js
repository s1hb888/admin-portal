// backend/models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },
  course: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  difficulty: { type: String },
  suggestions: { type: String, maxlength: 500 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
