const express = require("express");
const Urdu = require("../models/Urdu");

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const urdu = new Urdu(req.body);
    await urdu.save();
    res.status(201).json(urdu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all
router.get("/", async (req, res) => {
  try {
    const data = await Urdu.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ single
router.get("/:id", async (req, res) => {
  try {
    const urdu = await Urdu.findById(req.params.id);
    if (!urdu) return res.status(404).json({ error: "Not found" });
    res.json(urdu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Urdu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Urdu.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
