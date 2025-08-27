const mongoose = require('mongoose');

const bodypartSchema = new mongoose.Schema({
word: {
    type: String,
  },
  image_url: {
    type: String,
  },
  sound_text: {
    type: String,

  }
});

module.exports = mongoose.model('bodypart', bodypartSchema);