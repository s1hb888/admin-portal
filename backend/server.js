// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Routes imports
const accountRoutes = require("./routes/accountRoutes");
const { uploadRouter, fetchRouter, deleteRouter } = require("./routes/videos");
const alphabetRoutes = require("./routes/alphabetRoutes");
const urduRoutes = require("./routes/urduRoutes"); 
const numberRoutes = require("./routes/numberRoutes"); 
const vowelRoutes = require("./routes/vowelRoutes");
const fruitRoutes = require("./routes/fruitRoutes");
const vegetableRoutes = require("./routes/vegetableRoutes");
const bodypartRoutes = require("./routes/bodypartRoutes");
const profileRoutes = require("./routes/profileRoutes");
const insightRoutes = require("./routes/insightRoutes"); 

const app = express();
app.use(cors());
app.use(express.json());

// Learning Content Routes
app.use("/api/alphabets", alphabetRoutes);
app.use("/api/urdu_alphabets", urduRoutes);
app.use("/api/numbers", numberRoutes);
app.use("/api/vowels", vowelRoutes);
app.use("/api/fruits", fruitRoutes);
app.use("/api/vegetables", vegetableRoutes);
app.use("/api/bodyparts", bodypartRoutes);

// File Uploads (images)
app.use("/uploads", express.static("uploads"));

// DB Connection
mongoose.connect("mongodb://127.0.0.1:27017/PrepPalDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB Error:", err));

// Profile Routes
app.use("/api/profile", profileRoutes);

// Admin / Account Routes
app.use("/api/admins", accountRoutes);

// Insights Routes
app.use("/api/insights", insightRoutes);

// Video Routes
app.use("/api/upload-video", uploadRouter);
app.use("/api/videos", fetchRouter);
app.use("/api/delete-video", deleteRouter);
app.use("/uploads/videos", express.static(path.join(__dirname, "uploads/videos")));

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
