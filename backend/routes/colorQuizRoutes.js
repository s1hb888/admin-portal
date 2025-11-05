// routes/colorQuizRoutes.js
const express = require("express");
const ColorQuiz = require("../models/ColorQuiz");

const router = express.Router();

// ✅ Get all color quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await ColorQuiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add new color question
router.post("/", async (req, res) => {
  const { quiz_title, question, image_url, correct_answer } = req.body;
  try {
    let quiz = await ColorQuiz.findOne({ quiz_title });
    if (!quiz) quiz = new ColorQuiz({ quiz_title, questions: [] });

    quiz.questions.push({ question, image_url, correct_answer });
    await quiz.save();
    res.json({ message: "Question added successfully", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update a question
router.put("/:quizId/:questionId", async (req, res) => {
  const { quizId, questionId } = req.params;
  const { question, image_url, correct_answer } = req.body;

  try {
    const quiz = await ColorQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const q = quiz.questions.id(questionId);
    if (!q) return res.status(404).json({ message: "Question not found" });

    q.question = question;
    q.image_url = image_url;
    q.correct_answer = correct_answer;

    await quiz.save();
    res.json({ message: "Question updated successfully", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete a question
router.delete("/:quizId/:questionId", async (req, res) => {
  const { quizId, questionId } = req.params;

  try {
    const quiz = await ColorQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    quiz.questions = quiz.questions.filter(q => q._id.toString() !== questionId);
    await quiz.save();

    res.json({ message: "Question deleted successfully", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
