const mongoose = require('mongoose');

const alphabetSchema = new mongoose.Schema({
  alphabet: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  sound_text: {
    type: String,
    required: true,
  },
  min_attempts: {
    type: Number,
    required: true,
    default: 3,
  },
  min_time_avg: {
    type: Number,
    required: true,
    default: 2.0,
  },
  min_correct_avg: {
    type: Number,
    required: true,
    default: 80,
  },
});

module.exports = mongoose.model('Alphabet', alphabetSchema);
