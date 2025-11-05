// routes/vegetableQuizRoutes.js
const express = require("express");
const VegetableQuiz = require("../models/VegetableQuiz"); // ✅ correct import
const router = express.Router();

// 🟢 Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await VegetableQuiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Add new question to Vegetable Quiz
router.post("/", async (req, res) => {
  try {
    const { quiz_title, question, options, winner } = req.body;

    // find quiz by title or create new one
    let quiz = await VegetableQuiz.findOne({ quiz_title });
    if (!quiz) {
      quiz = new VegetableQuiz({ quiz_title, questions: [] });
    }

    quiz.questions.push({ question, options, winner });
    await quiz.save();

    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟡 Update single question
router.put("/:quizId/:questionId", async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { question, options, winner } = req.body;

    const quiz = await VegetableQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const q = quiz.questions.id(questionId);
    if (!q) return res.status(404).json({ error: "Question not found" });

    q.question = question;
    q.options = options;
    q.winner = winner;

    await quiz.save();
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔴 Delete single question
// DELETE single question inside a quiz
router.delete("/:quizId/:questionId", async (req, res) => {
  try {
    const { quizId, questionId } = req.params;

    // find quiz
    const quiz = await VegetableQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    // find question
    const question = quiz.questions.id(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    // remove question
    question.deleteOne();

    await quiz.save();

    res.json({ message: "✅ Question deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting question:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
