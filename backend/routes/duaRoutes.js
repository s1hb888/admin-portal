// routes/duaRoutes.js
const express = require("express");
const router = express.Router();
const Dua = require("../models/Dua");

// ✅ Get all duas
router.get("/", async (req, res) => {
  try {
    const duas = await Dua.find();
    res.json(duas);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch duas" });
  }
});

// ✅ Create a dua
router.post("/", async (req, res) => {
  try {
    const newDua = new Dua(req.body);
    await newDua.save();
    res.json(newDua);
  } catch (err) {
    res.status(500).json({ error: "Failed to add dua" });
  }
});

// ✅ Update a dua
router.put("/:id", async (req, res) => {
  try {
    const updated = await Dua.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update dua" });
  }
});

// ✅ Delete a dua
router.delete("/:id", async (req, res) => {
  try {
    await Dua.findByIdAndDelete(req.params.id);
    res.json({ message: "Dua deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete dua" });
  }
});

module.exports = router;
