const express = require('express');
const router = express.Router();
const BasicQuestion = require('../models/BasicQuestion');

// ✅ Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await BasicQuestion.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new question
router.post('/', async (req, res) => {
  try {
    const newQuestion = new BasicQuestion(req.body);
    await newQuestion.save();
    res.json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Update a question
router.put('/:id', async (req, res) => {
  try {
    const updated = await BasicQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete a question
router.delete('/:id', async (req, res) => {
  try {
    await BasicQuestion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
