// routes/vowelQuizRoutes.js
const express = require("express");
const VowelQuiz = require("../models/VowelQuiz");

const router = express.Router();

// ✅ Get all vowel quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await VowelQuiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add new vowel quiz question
router.post("/", async (req, res) => {
  const { quiz_title, question, correct_answer } = req.body;

  try {
    let quiz = await VowelQuiz.findOne({ quiz_title });
    if (!quiz) {
      quiz = new VowelQuiz({ quiz_title, questions: [] });
    }

    quiz.questions.push({ question, correct_answer });
    await quiz.save();

    res.json({ message: "Question added successfully", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update question
router.put("/:quizId/:questionId", async (req, res) => {
  const { quizId, questionId } = req.params;
  const { question, correct_answer } = req.body;

  try {
    const quiz = await VowelQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const q = quiz.questions.id(questionId);
    if (!q) return res.status(404).json({ message: "Question not found" });

    q.question = question;
    q.correct_answer = correct_answer;

    await quiz.save();
    res.json({ message: "Question updated", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete question
router.delete("/:quizId/:questionId", async (req, res) => {
  const { quizId, questionId } = req.params;

  try {
    const quiz = await VowelQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    quiz.questions = quiz.questions.filter((q) => q._id.toString() !== questionId);
    await quiz.save();

    res.json({ message: "Question deleted", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const vowelQuizRoutes = router;
module.exports = vowelQuizRoutes;
