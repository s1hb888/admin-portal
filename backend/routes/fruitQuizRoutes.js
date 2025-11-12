const express = require("express");
const FruitQuiz = require("../models/FruitQuiz"); // No .js needed, Node resolves automatically

const router = express.Router();

// ✅ GET all fruit quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await FruitQuiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST a new fruit quiz
router.post("/", async (req, res) => {
  console.log("📩 Received data:", req.body); // log incoming data
  try {
    const newQuiz = new FruitQuiz(req.body);
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    console.error("❌ Error saving quiz:", err);
    res.status(400).json({ message: err.message });
  }
});

router.put('/update-question/:quizId/:questionId', async (req, res) => {
  const { quizId, questionId } = req.params;
  const updatedQuestion = req.body;

  try {
    const quiz = await FruitQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const question = quiz.questions.id(questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    // Update fields
    question.question = updatedQuestion.question;
    question.winner = updatedQuestion.winner;
    question.options = updatedQuestion.options;

    await quiz.save();
    res.json({ message: "Question updated successfully!" });
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/fruitquiz/add-question
router.post("/add-question", async (req, res) => {
  const { question, options, winner } = req.body;

  try {
    // Assuming there's only 1 quiz in DB
    let quiz = await FruitQuiz.findOne();
    if (!quiz) {
      // If quiz doesn't exist, create it
      quiz = new FruitQuiz({
        quiz_title: "Fruit Race Quiz",
        questions: [],
      });
    }

    // Add the new question
    quiz.questions.push({ question, options, winner });

    await quiz.save();
    res.json({ message: "Question added successfully", questions: quiz.questions });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// ✅ PUT (Update) question in a quiz
router.put("/:quizId/:questionId", async (req, res) => {
  const { quizId, questionId } = req.params;
  const { question, options, winner } = req.body;

  try {
    const quiz = await FruitQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const q = quiz.questions.id(questionId);
    if (!q) return res.status(404).json({ message: "Question not found" });

    q.question = question;
    q.options = options;
    q.winner = winner;

    await quiz.save();
    res.json({ message: "Question updated successfully", question: q });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE question
router.delete("/:quizId/:questionId", async (req, res) => {
  const { quizId, questionId } = req.params;
  try {
    const quiz = await FruitQuiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    quiz.questions = quiz.questions.filter(
      (q) => q._id.toString() !== questionId
    );
    await quiz.save();

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
