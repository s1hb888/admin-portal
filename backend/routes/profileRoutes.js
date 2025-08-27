const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware for auth
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(decoded.id).select("-password");
    if (!req.user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Multer setup for uploads folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.user._id + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

// GET profile
router.get("/", protect, async (req, res) => {
  res.json(req.user);
});

// UPDATE profile (username/password)
router.put("/update", protect, async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findById(req.user._id);

    if (username) admin.username = username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// UPLOAD profile picture
router.put("/photo", protect, upload.single("profileImage"), async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);
    admin.profileImage = `/uploads/${req.file.filename}`;
    await admin.save();
    res.json({ success: true, imageUrl: admin.profileImage });
  } catch (err) {
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
});

// DELETE account
router.delete("/delete", protect, async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.user._id);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;
