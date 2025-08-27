const express = require("express");
const Vegetable = require("../models/Vegetable"); // ✅ no .js needed in CJS

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const vegetable = new Vegetable(req.body);
    await vegetable.save();
    res.status(201).json(vegetable);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const data = await Vegetable.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single
router.get("/:id", async (req, res) => {
  try {
    const vegetable = await Vegetable.findById(req.params.id);
    if (!vegetable) return res.status(404).json({ error: "Not found" });
    res.json(vegetable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Vegetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Vegetable.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // ✅ CommonJS export
