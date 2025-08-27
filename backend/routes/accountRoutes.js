const express = require("express");
const jwt = require("jsonwebtoken");
const Admins = require("../models/Admin");

const {
  getAllParentAccounts,
  toggleAccountStatus,
} = require("../controllers/accountController");

const router = express.Router();
const JWT_SECRET = "your_secret_key";

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};

// ✅ Admin Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const adminExists = await Admins.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admins.create({ username, email, password });


    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error in Signup", error: err.message });
  }
});

// ✅ Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admins.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error in Login", error: err.message });
  }
});

// ✅ Existing Parent Accounts routes
router.get("/", getAllParentAccounts);
router.put("/toggle-status/:id", toggleAccountStatus);

module.exports = router;
