const nodemailer = require("nodemailer");

// ✅ Common transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true = port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// ✅ Signup / Email Verification
const sendVerificationEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"PrepPal Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Verification email sent successfully to", to);
  } catch (error) {
    console.error("❌ Verification email not sent:", error);
  }
};

// ✅ Password Reset
const sendResetPasswordEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"PrepPal Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Password reset email sent successfully to", to);
  } catch (error) {
    console.error("❌ Password reset email not sent:", error);
  }
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};
