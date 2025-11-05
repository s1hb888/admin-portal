// routes/countingQuizRoutes.js
const express = require("express");
const CountingQuiz = require("../models/CountingQuiz");

const router = express.Router();

// ✅ Get all counting quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await CountingQuiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add new counting question
router.post("/", async (req, res) => {
  const { quiz_title, question, images, answer } = req.body;
  try {
    let quiz = await CountingQuiz.findOne({ quiz_title });
    if (!quiz) quiz = new CountingQuiz({ quiz_title, questions: [] });

    quiz.questions.push({ question, images, answer });
    await quiz.save();
    res.json({ message: "Question added successfully", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update a question
router.put("/:quizId/:questionId", async (req, res) => {
  const { quizId, questionId } = req.params;
  const { question, images, answer } = req.body;
  try {
    const quiz = await CountingQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const q = quiz.questions.id(questionId);
    if (!q) return res.status(404).json({ message: "Question not found" });

    q.question = question;
    q.images = images;
    q.answer = answer;
    await quiz.save();
    res.json({ message: "Question updated", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete a question
router.delete("/:quizId/:questionId", async (req, res) => {
  const { quizId, questionId } = req.params;
  try {
    const quiz = await CountingQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    quiz.questions = quiz.questions.filter(q => q._id.toString() !== questionId);
    await quiz.save();
    res.json({ message: "Question deleted", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const countingQuizRoutes = router;
module.exports = countingQuizRoutes;
