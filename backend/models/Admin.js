const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profileImage: {
    type: String,
    default: null,
  },

  // 🔹 New fields for email verification
  isVerified: {
    type: Boolean,
    default: false, // jab tak email confirm na ho
  },
  verificationToken: {
    type: String,
    default: null, // store temporary token
  },
  verificationTokenExpires: {
    type: Date,
    default: null, // token expiry date/time
  },
    resetPasswordToken: {
    type: String,
    default: null, // store temporary token
  },
  resetPasswordExpire: {
    type: Date,
    default: null, // token expiry date/time
  }

}, { timestamps: true });

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 👇 This is where you set the collection name ("admins")
module.exports = mongoose.model("admins", adminSchema);
