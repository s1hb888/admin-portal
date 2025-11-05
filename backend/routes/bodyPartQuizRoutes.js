// routes/bodyPartQuizRoutes.js
const express = require("express");
const QuizBodyPart = require("../models/QuizBodyPart");

const router = express.Router();

// Get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await QuizBodyPart.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new question
router.post("/", async (req, res) => {
  const { quiz_title, question, image_url, answer } = req.body;
  try {
    let quiz = await QuizBodyPart.findOne({ quiz_title });
    if (!quiz) quiz = new QuizBodyPart({ quiz_title, questions: [] });
    quiz.questions.push({ question, image_url, answer });
    await quiz.save();
    res.json({ message: "Question added successfully", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update question
router.put("/:quizId/:questionId", async (req, res) => {
  const { quizId, questionId } = req.params;
  const { question, image_url, answer } = req.body;
  try {
    const quiz = await QuizBodyPart.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const q = quiz.questions.id(questionId);
    if (!q) return res.status(404).json({ message: "Question not found" });

    q.question = question;
    q.image_url = image_url;
    q.answer = answer;

    await quiz.save();
    res.json({ message: "Question updated", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete question
router.delete("/:quizId/:questionId", async (req, res) => {
  const { quizId, questionId } = req.params;
  try {
    const quiz = await QuizBodyPart.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    quiz.questions = quiz.questions.filter(q => q._id.toString() !== questionId);
    await quiz.save();
    res.json({ message: "Question deleted", quiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const bodyPartQuizRoutes = router;
module.exports = bodyPartQuizRoutes;
