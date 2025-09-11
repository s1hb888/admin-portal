const express = require("express");
const jwt = require("jsonwebtoken");
const Admins = require("../models/Admin");
const { sendVerificationEmail, sendResetPasswordEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const router = express.Router();
const JWT_SECRET = "your_secret_key";

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};

// ✅ Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const adminExists = await Admins.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admins.create({ username, email, password });

    // Generate verification token
    const verifyToken = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const verifyUrl = `http://localhost:5000/api/admins/verify/${verifyToken}`;

    // Send verification email
  await sendVerificationEmail({
  to: admin.email,
  subject: "Verify your Email",
  html: `<p>Click this link to verify your account:</p>
         <a href="http://localhost:5000/api/admins/verify/${verifyToken}">Verify Email</a>`,
});

    res.status(201).json({
      message: "Signup successful. Please check your email to verify your account.",
    });
  } catch (err) {
    res.status(500).json({ message: "Error in Signup", error: err.message });
  }
});

// ✅ Email Verification Route
router.get("/verify/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, JWT_SECRET);
    const admin = await Admins.findById(decoded.id);

    if (!admin) return res.status(400).send("Invalid token");

    admin.isVerified = true;
    await admin.save();

    // Redirect to frontend login
    res.redirect("http://localhost:3000/admin/login");
  } catch (err) {
    res.status(400).send("Invalid or expired token");
  }
});

// ✅ Email Verification Route
router.get("/verify/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, JWT_SECRET);
    const admin = await Admins.findById(decoded.id);

    if (!admin) return res.status(400).send("Invalid token");

    admin.isVerified = true;
    await admin.save();

    // ✅ Redirect frontend login page
    res.redirect("http://localhost:3000/admin/login");
  } catch (err) {
    res.status(400).send("Invalid or expired token");
  }
});


// ✅ Login (only if verified)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admins.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!admin.isVerified) {
      return res.status(401).json({ message: "Please verify your email first." });
    }

    if (await admin.matchPassword(password)) {
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
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admins.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found with this email" });
    }

    // ✅ Reset token generate
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 30 * 60 * 1000; // 30 minutes expiry

    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpire = resetTokenExpire;
    await admin.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    // ✅ Reset link
   // const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // ✅ Email content
    const message = `
      <h3>Password Reset Request</h3>
      <p>Click the link below to reset your password. This link is valid for 30 minutes.</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    `;

   await sendResetPasswordEmail({
  to: admin.email,
  subject: "Reset Your Password",
  html: `<p>Click below to reset your password. Valid for 30 minutes:</p>
         <a href="http://localhost:3000/reset-password/${resetToken}">${resetUrl}</a>`,
});

    res.json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    res.status(500).json({ message: "Error sending reset email." });
  }
});

/**
 * Reset Password - With token
 */
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const admin = await Admins.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // ✅ Assign new password (pre-save hook will hash it)
    admin.password = password;

    // Clear reset token fields
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save();

    res.json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    res.status(500).json({ message: "Error resetting password." });
  }
});



module.exports = router;
