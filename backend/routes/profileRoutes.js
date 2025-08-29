const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// ⚠️ Use the same secret as in your login routes
const JWT_SECRET = "your_secret_key"; // Replace with process.env.JWT_SECRET in production

// Middleware for authentication (JWT)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      req.admin = await Admin.findById(decoded.id).select("-password");

      if (!req.admin) return res.status(404).json({ message: "Admin not found" });
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token failed", error: error.message });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

// Multer setup for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, req.admin._id + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Get logged-in admin profile
router.get("/", protect, async (req, res) => {
  try {
    res.json(req.admin);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
});

// ✅ Update admin profile (username/password)
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
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

// ✅ Upload/change profile picture
router.put("/photo", protect, upload.single("profileImage"), async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    // Delete old image if exists
    if (admin.profileImage) {
      const oldPath = path.join(__dirname, "..", admin.profileImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    admin.profileImage = `/uploads/${req.file.filename}`;
    await admin.save();

    res.json({ success: true, imageUrl: admin.profileImage });
  } catch (err) {
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
});

// ✅ Delete admin account
router.delete("/delete", protect, async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.admin._id);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

module.exports = router;
