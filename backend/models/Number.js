const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
  number: {
    type: String,
  },
  image_url: {
    type: String,
  },
  word: {
    type: String,
  },
  sound_text: {
    type: String,

  }
});

module.exports = mongoose.model('number', numberSchema);
