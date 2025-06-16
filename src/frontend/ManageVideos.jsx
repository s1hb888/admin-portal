import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { Trash2, UploadCloud, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';
import Sidebar from '../components/Sidebar';
import '../styles/ManageVideos.css';


const themeGreen = '#2BCB9A';
const themeRed = '#EF3349';
const themeYellow = '#FFCF25';
const categories = ['Academic Learning', 'General Knowledge'];



const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({ title: '', description: '', category: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/videos');
      setVideos(res.data);
    } catch (err) {
      console.error('Failed to fetch videos', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/delete-video/${id}`);
      fetchVideos();
    } catch (err) {
      alert('Failed to delete video');
    }
  };

  const handleRedirectToUpload = () => {
    navigate('/admin/upload-videos');
  };

  const openEditModal = (video) => {
    setFormData({
      title: video.title,
      description: video.description,
      category: video.category
    });
    setSelectedVideo(video);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/videos/${selectedVideo._id}`, formData);
      setEditModal(false);
      setSelectedVideo(null); // Fix auto-play after edit
      fetchVideos();
    } catch (err) {
      alert('Failed to update video');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <TopNavbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <main
        style={{
          marginLeft: sidebarOpen ? '295px' : '0',
          padding: '2rem',
          marginTop: '0px',
          minHeight: 'calc(100vh - 60px)',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 style={{ color: themeGreen, textAlign: 'center', width: '100%', marginBottom: 0 }}>Video Library of Little Genius!</h3>
          <Button 
  onClick={handleRedirectToUpload} 
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
    lineHeight: '1' // Force one-line alignment
  }}
>
  <UploadCloud size={18} style={{ verticalAlign: 'middle' }} />
  <span style={{ verticalAlign: 'middle' }}>Upload Video</span>
</Button>

        </div>

        <div className="row g-4">
          {videos.map((video) => (
            <div className="col-md-4" key={video._id}>
             <div className="card video-card shadow-sm h-100">


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
                <div className="card-body">
  <h5 className="card-title text-truncate">{video.title}</h5>
  <p className="card-text small text-muted">{video.description}</p>
                  
  {/* Updated line with badge + buttons in one row */}
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

        {/* Video Preview Modal */}
        <Modal show={!!selectedVideo && !editModal} onHide={() => setSelectedVideo(null)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedVideo?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedVideo && (
              <video width="100%" height="auto" controls>
                <source src={selectedVideo.url} type="video/mp4" />
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
