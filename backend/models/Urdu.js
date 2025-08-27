const mongoose = require('mongoose');

const urduSchema = new mongoose.Schema({
  alphabet: {
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

module.exports = mongoose.model('urdu_alphabet', urduSchema);
