const express = require("express");
const Number = require("../models/Number"); // ✅ no .js needed in CJS

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const number = new Number(req.body);
    await number.save();
    res.status(201).json(number);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const data = await Number.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single
router.get("/:id", async (req, res) => {
  try {
    const number = await Number.findById(req.params.id);
    if (!number) return res.status(404).json({ error: "Not found" });
    res.json(SVGAnimatedNumber);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Number.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Number.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // ✅ CommonJS export
