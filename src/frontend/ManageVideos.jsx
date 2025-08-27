import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { Trash2, Pencil, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 🔁 navigation
import TopNavbar from '../components/TopNavbar';
import Sidebar from '../components/Sidebar';
import '../styles/ManageVideos.css';
import { API_BASE_URL } from './config';


import AddNewVideo from './AddNewVideo';
const themeGreen = '#2BCB9A';
const themeRed = '#EF3349';
const themeYellow = '#FFCF25';
const categories = ['Academic Learning', 'General Knowledge'];

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({ title: '', description: '', category: '', url: '' });

  const navigate = useNavigate(); // 🧭 hook for navigating

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/videos`);
      setVideos(res.data);
    } catch (err) {
      console.error('Failed to fetch videos', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/delete-video/${id}`);
      fetchVideos();
    } catch (err) {
      alert('Failed to delete video');
    }
  };

  const openEditModal = (video) => {
    setFormData({
      title: video.title,
      description: video.description,
      category: video.category,
      url: video.url || ''
    });
    setSelectedVideo(video);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/videos/${selectedVideo._id}`, formData);
      setEditModal(false);
      setSelectedVideo(null);
      fetchVideos();
    } catch (err) {
      alert('Failed to update video');
    }
  };

  const isYouTubeLink = (url) => url?.includes('youtube.com') || url?.includes('youtu.be');

return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <TopNavbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <main
        className="main-content-wrapper" /* Use the new CSS class here */
        style={{
          marginLeft: sidebarOpen ? '295px' : '0' // Keep this dynamic style
        }}
      >
        <div className="heading-bar"> {/* Use the heading-bar class here */}
          <h3 className="page-heading">
            Video Library of Little Genius!
          </h3>
          <Button
            onClick={() => navigate('/admin/add-video')}
            style={{
              backgroundColor: themeGreen,
              borderColor: themeGreen,
              fontWeight: '500',
              padding: '0.5rem 1.5rem',
              minWidth: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              whiteSpace: 'nowrap',
              lineHeight: '1',
              color: '#fff'
            }}
          >
            <Plus size={20} color="white" strokeWidth={2.5} />
            <span>Add New Video</span>
          </Button>
        </div>

        <div className="row g-4">
          {videos.map((video) => (
            <div className="col-md-4" key={video._id}>
              <div className="card video-card shadow-sm h-100">
                {isYouTubeLink(video.url) ? (
                  <iframe
                    width="100%"
                    height="180"
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                  ></iframe>
                ) : (
                  <video
                    width="100%"
                    height="180"
                    muted
                    controls
                    preload="metadata"
                    style={{ cursor: 'pointer', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <source src={video.url} type="video/mp4" />
                  </video>
                )}
                <div className="card-body">
                  <h5 className="card-title text-truncate">{video.title}</h5>
                  <p className="card-text small text-muted">{video.description}</p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="badge" style={{ backgroundColor: themeGreen, color: 'white' }}>
                      {video.category}
                    </span>
                    <div className="d-flex gap-2">
                      <Button
                        style={{ backgroundColor: themeYellow, borderColor: themeYellow }}
                        size="sm"
                        onClick={() => openEditModal(video)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        style={{ backgroundColor: themeRed, borderColor: themeRed }}
                        size="sm"
                        onClick={() => handleDelete(video._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Modal */}
        <Modal show={!!selectedVideo && !editModal} onHide={() => setSelectedVideo(null)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedVideo?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedVideo && isYouTubeLink(selectedVideo.url) ? (
              <iframe
                width="100%"
                height="400"
                src={selectedVideo?.url}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video width="100%" height="auto" controls>
                <source src={selectedVideo?.url} type="video/mp4" />
              </video>
            )}
          </Modal.Body>
        </Modal>

        {/* Edit Modal */}
        <Modal show={editModal} onHide={() => { setEditModal(false); setSelectedVideo(null); }} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Video Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Video URL (optional if uploading file)</Form.Label>
                <Form.Control
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setEditModal(false); setSelectedVideo(null); }}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: themeGreen, borderColor: themeGreen }} onClick={handleUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default ManageVideos;
