// models/VegetableQuiz.js
const mongoose = require("mongoose");

// ✅ Only ONE vegetable (name + image) per question
const optionSchema = new mongoose.Schema({
  word: { type: String, required: true },
  image_url: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: optionSchema, required: true }, // ✅ Not an array
  winner: { type: String, required: true },
});

const vegetableQuizSchema = new mongoose.Schema({
  quiz_title: { type: String, required: true },
  questions: [questionSchema],
});

const VegetableQuiz = mongoose.model("VegetableQuiz", vegetableQuizSchema);

module.exports = VegetableQuiz;