const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const JWT_SECRET = "your_secret_key"; // Use process.env.JWT_SECRET in production

// ------------------ Auth Middleware ------------------
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select("-password");
      if (!req.admin) return res.status(404).json({ message: "Admin not found" });
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Token failed", error: error.message });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

// ------------------ Multer Setup ------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, req.admin._id + "-" + Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ------------------ Routes ------------------

// Get profile
router.get("/", protect, async (req, res) => {
  res.json(req.admin);
});

// Update username/password
router.put("/update", protect, async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (username) admin.username = username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// Upload/change profile image
router.put("/photo", protect, upload.single("profileImage"), async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    // Delete old image
    if (admin.profileImage) {
      const oldPath = path.join(__dirname, "..", admin.profileImage.replace("/", path.sep));
      console.log("Deleting old image:", oldPath);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    admin.profileImage = `/uploads/${req.file.filename}`;
    await admin.save();
    res.json({ success: true, imageUrl: admin.profileImage });
  } catch (err) {
    console.error("Image upload failed:", err);
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
});

// Delete profile image only
router.delete("/photo", protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (!admin.profileImage) {
      return res.status(400).json({ message: "No profile image to delete" });
    }

    const imagePath = path.join(__dirname, "..", admin.profileImage.replace("/", path.sep));
    console.log("Deleting profile image:", imagePath);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    admin.profileImage = null;
    await admin.save();

    res.json({ message: "Profile image deleted successfully" });
  } catch (err) {
    console.error("Failed to delete profile image:", err);
    res.status(500).json({ message: "Failed to delete profile image", error: err.message });
  }
});

// Delete account
router.delete("/delete", protect, async (req, res) => {
  try {
    console.log("Deleting account for admin:", req.admin._id);

    const admin = await Admin.findById(req.admin._id);

    // Delete profile image if exists
    if (admin.profileImage) {
      const oldPath = path.join(__dirname, "..", admin.profileImage.replace("/", path.sep));
      console.log("Deleting profile image:", oldPath);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await Admin.findByIdAndDelete(req.admin._id);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete account failed:", err);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;
