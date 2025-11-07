const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
  number: {
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
  },
  min_time_avg: {
    type: Number,
    required: true,
  },
  min_correct_avg: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Number', numberSchema);
