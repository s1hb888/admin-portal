const mongoose = require('mongoose');

const vowelSchema = new mongoose.Schema({
  image_url: {
    type: String,
  },
  sound_text: {
    type: String,

  },
  alphabet: {
    type: String,
  },
});

module.exports = mongoose.model('vowel', vowelSchema);
