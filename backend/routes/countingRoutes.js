const express = require("express");
const router = express.Router();
const Counting = require("../models/Counting"); // adjust path as per your folder

// ✅ GET all
router.get("/", async (req, res) => {
  try {
    const items = await Counting.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch counting items" });
  }
});

// ✅ POST new
router.post("/", async (req, res) => {
  try {
    const newItem = new Counting(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to add counting item" });
  }
});

// ✅ PUT update
router.put("/:id", async (req, res) => {
  try {
    const updated = await Counting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update counting item" });
  }
});

// ✅ DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Counting.findByIdAndDelete(req.params.id);
    res.json({ message: "Counting item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete counting item" });
  }
});

module.exports = router;
