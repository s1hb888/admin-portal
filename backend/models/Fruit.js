const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
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

module.exports = mongoose.model('fruit', fruitSchema);
