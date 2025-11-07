const mongoose = require("mongoose");

// Schema for individual quiz questions
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question text is required"],   // Better validation message
    trim: true,                                      // Removes extra spaces
  },
  image_url: {
    type: String,
    required: [true, "Image URL is required"],        // Added missing field from your JSON
    trim: true,
  },
  correct_answer: {
    type: String,
    required: [true, "Correct answer is required"],
    trim: true,
    lowercase: true,                                 // Ensures consistency (e.g., "A" → "a")
  },
});

// Schema for the quiz
const vowelQuizSchema = new mongoose.Schema(
  {
    quiz_title: {
      type: String,
      required: [true, "Quiz title is required"],
      trim: true,
    },
    questions: {
      type: [questionSchema],
      validate: [
        (arr) => arr.length > 0,
        "At least one question is required",
      ],
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Create model
const VowelQuiz = mongoose.model("VowelQuiz", vowelQuizSchema);

module.exports = VowelQuiz;
