// routes/shapeQuizRoutes.js
const express = require("express");
const ShapeQuiz = require("../models/ShapeQuiz");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const quizzes = await ShapeQuiz.find();
    console.log("GET /api/shapequiz ->", quizzes.length, "quizzes");
    res.json(quizzes);
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log("POST /api/shapequiz body:", req.body);
  const { quiz_title, shapeName, imageUrl, hints } = req.body;

  try {
    let quiz = await ShapeQuiz.findOne({ quiz_title });
    if (!quiz) quiz = new ShapeQuiz({ quiz_title, questions: [] });

    quiz.questions.push({ shapeName, imageUrl, hints });
    await quiz.save();

    res.json({ message: "Question added successfully", quiz });
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/:quizId/:questionId", async (req, res) => {
  console.log("PUT /api/shapequiz", req.params, "body:", req.body);
  const { quizId, questionId } = req.params;
  const { shapeName, imageUrl, hints } = req.body;

  try {
    const quiz = await ShapeQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const question = quiz.questions.id(questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    question.shapeName = shapeName;
    question.imageUrl = imageUrl;
    question.hints = hints;

    await quiz.save();
    res.json({ message: "Question updated successfully", quiz });
  } catch (err) {
    console.error("PUT error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:quizId/:questionId", async (req, res) => {
  console.log("DELETE /api/shapequiz", req.params);
  const { quizId, questionId } = req.params;

  try {
    const quiz = await ShapeQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    quiz.questions = quiz.questions.filter(q => q._id.toString() !== questionId);
    await quiz.save();

    res.json({ message: "Question deleted successfully", quiz });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
