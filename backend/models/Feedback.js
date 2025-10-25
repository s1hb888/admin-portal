const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  appEaseOfUse: { type: Number, min: 1, max: 5, required: true },
  performanceRating: { type: Number, min: 1, max: 5, required: true },
  designSatisfaction: { type: Number, min: 1, max: 5, required: true },
  featureUsefulness: { type: Number, min: 1, max: 5, required: true },
  bugOrIssueExperience: { type: String, maxlength: 500 },
  suggestions: { type: String, maxlength: 500 },
  dateOfFeedback: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
