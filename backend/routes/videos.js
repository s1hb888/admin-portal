// routes/videos.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Video = require('../models/Video');

const uploadRouter = express.Router();
const fetchRouter = express.Router();
const deleteRouter = express.Router();

// === Upload Config ===
const uploadPath = path.join(__dirname, '../uploads/videos');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 400 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.mp4') return cb(null, false);
    cb(null, true);
  },
}).single('video');

// === POST /api/upload-video ===
uploadRouter.post('/', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds 400MB limit.' });
      }
      return res.status(500).json({ error: 'Upload failed. Try again.' });
    }

    if (!req.file) return res.status(400).json({ error: 'No MP4 video uploaded.' });

    const { title, description, category } = req.body;
    const fileName = path.basename(req.file.path);
    const url = `http://localhost:5000/uploads/videos/${fileName}`;

    if (!title || title.length > 50) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Title is required and must not exceed 50 characters.' });
    }

    try {
      const existing = await Video.findOne({ title });
      if (existing) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: 'Title already exists' });
      }

      const newVideo = new Video({ title, description, category, url });
      await newVideo.save();
      res.status(200).json({ message: 'Video uploaded successfully!' });
    } catch (error) {
      fs.unlinkSync(req.file.path);
      res.status(500).json({ error: 'Failed to save video info.' });
    }
  });
});

// === GET /api/videos ===
fetchRouter.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ uploadedAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch videos' });
  }
});

// === DELETE /api/delete-video/:id ===
deleteRouter.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const filePath = path.join(uploadPath, path.basename(video.url));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete video' });
  }
});

fetchRouter.put('/:id', async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || title.length > 50) {
    return res.status(400).json({ error: 'Title is required and must not exceed 50 characters.' });
  }

  try {
    const updated = await Video.findByIdAndUpdate(
      req.params.id,
      { title, description, category },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.status(200).json({ message: 'Video updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update video' });
  }
});

// Export all routers
module.exports = {
  uploadRouter,
  fetchRouter,
  deleteRouter,
};

