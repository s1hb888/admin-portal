const express = require("express");
const Alphabet = require("../models/Alphabet"); // ✅ no .js needed in CJS

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const alphabet = new Alphabet(req.body);
    await alphabet.save();
    res.status(201).json(alphabet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const data = await Alphabet.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single
router.get("/:id", async (req, res) => {
  try {
    const alphabet = await Alphabet.findById(req.params.id);
    if (!alphabet) return res.status(404).json({ error: "Not found" });
    res.json(alphabet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Alphabet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Alphabet.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // ✅ CommonJS export
