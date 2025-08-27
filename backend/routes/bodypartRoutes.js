const express = require("express");
const Bodypart = require("../models/Bodypart"); // ✅ no .js needed in CJS

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const bodypart = new Bodypart(req.body);
    await bodypart.save();
    res.status(201).json(Bodypart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const data = await Bodypart.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single
router.get("/:id", async (req, res) => {
  try {
    const bodypart = await Bodypart.findById(req.params.id);
    if (!bodypart) return res.status(404).json({ error: "Not found" });
    res.json(bodypart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Bodypart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Bodypart.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // ✅ CommonJS export
