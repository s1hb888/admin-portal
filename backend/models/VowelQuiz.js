// models/VowelQuiz.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
});

const vowelQuizSchema = new mongoose.Schema({
  quiz_title: { type: String, required: true },
  questions: [questionSchema],
});

const VowelQuiz = mongoose.model("VowelQuiz", vowelQuizSchema);

module.exports = VowelQuiz;
