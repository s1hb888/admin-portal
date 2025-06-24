const express = require('express');
const Video = require('../models/Video');

// Individual routers
const uploadRouter = express.Router();
const fetchRouter = express.Router();
const deleteRouter = express.Router();

// === POST /api/upload-video ===
uploadRouter.post('/', async (req, res) => {
  const { title, description, category, url } = req.body;

  if (!title || title.length > 50) {
    return res.status(400).json({ error: 'Title is required and must not exceed 50 characters.' });
  }

  if (!url) {
    return res.status(400).json({ error: 'Video URL is required.' });
  }

  try {
    const existing = await Video.findOne({ title });
    if (existing) {
      return res.status(400).json({ error: 'Title already exists' });
    }

    const newVideo = new Video({ title, description, category, url });
    await newVideo.save();
    res.status(200).json({ message: 'Video added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save video info.' });
  }
});

// === GET /api/videos ===
fetchRouter.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch videos' });
  }
});

// === PUT /api/videos/:id ===
fetchRouter.put('/:id', async (req, res) => {
  const { title, description, category, url } = req.body;

  if (!title || title.length > 50) {
    return res.status(400).json({ error: 'Title is required and must not exceed 50 characters.' });
  }

  try {
    const updated = await Video.findByIdAndUpdate(
      req.params.id,
      { title, description, category, url },
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

// === DELETE /api/delete-video/:id ===
deleteRouter.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete video' });
  }
});

// ✅ Export routers correctly
module.exports = {
  uploadRouter,
  fetchRouter,
  deleteRouter,
};
