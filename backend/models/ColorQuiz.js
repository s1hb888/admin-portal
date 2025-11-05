// models/ColorQuiz.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,       // Example: "What is the color of mango?"
  image_url: String,      // One image URL only
  correct_answer: String, // Example: "Yellow"
});

const colorQuizSchema = new mongoose.Schema({
  quiz_title: { type: String, required: true },
  questions: [questionSchema],
});

const ColorQuiz = mongoose.model("ColorQuiz", colorQuizSchema);

module.exports = ColorQuiz;
