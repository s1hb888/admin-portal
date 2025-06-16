// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const accountRoutes = require('./routes/accountRoutes');
const { uploadRouter, fetchRouter, deleteRouter } = require('./routes/videos');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/PrepPalDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/users', accountRoutes);
app.use('/api/upload-video', uploadRouter);    // for POST
app.use('/api/videos', fetchRouter);           // for GET
app.use('/api/delete-video', deleteRouter);    // for DELETE
// Static path
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos')));

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
