import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { UploadCloud, Tag, FileText, List, Link as LinkIcon } from 'lucide-react';
import TopNavbar from '../components/TopNavbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { API_BASE_URL } from './config';
import { useNavigate } from 'react-router-dom';

const categories = ['Academic Learning', 'General Knowledge'];

const colors = {
  primary: '#2BCB9A',
  danger: '#EF3349',
  warning: '#FFCF25',
  text: '#222',
  background: '#FAFAFA',
};

const AddNewVideo = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const MAX_TITLE_LENGTH = 50;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    if (title.trim() === '') newErrors.push('Title is required.');
    if (title.length > MAX_TITLE_LENGTH) newErrors.push(`Title can't exceed ${MAX_TITLE_LENGTH} characters.`);
    if (!url.trim()) newErrors.push('Video URL is required.');
    else if (!/^https?:\/\/\S+/.test(url)) newErrors.push('Please enter a valid video URL.');

    setErrors(newErrors);
    if (newErrors.length > 0) return;

    // ✅ Convert to embed URL if it's a YouTube link
    let embedUrl = url.trim();

    if (embedUrl.includes('youtube.com/watch?v=')) {
      const videoId = embedUrl.split('v=')[1].split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (embedUrl.includes('youtu.be/')) {
      const videoId = embedUrl.split('youtu.be/')[1].split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/upload-video`, {
        title,
        description,
        category,
        url: embedUrl,
      });

      setUploadSuccess(true);
      setTitle('');
      setDescription('');
      setCategory(categories[0]);
      setUrl('');
    } catch (err) {
      console.error(err);
      setErrors(['Failed to add video. Try again.']);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background }}>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <TopNavbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
          }}
        >
          <h3
            style={{
              color: colors.primary,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: '600',
              marginBottom: '20px',
            }}
          >
            <UploadCloud size={26} />
            Add New Video
          </h3>

          <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '28px' }}>
            Add a YouTube or direct video URL along with metadata to the PrepPal video library.
          </p>

          <Form onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} style={{ color: colors.primary }} />
                Video Title
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter video title"
                value={title}
                maxLength={MAX_TITLE_LENGTH}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Text muted>{title.length} / {MAX_TITLE_LENGTH}</Form.Text>
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tag size={18} style={{ color: colors.primary }} />
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Brief description of the content"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            {/* URL */}
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LinkIcon size={18} style={{ color: colors.primary }} />
                Video URL
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Paste YouTube or direct video URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>

            {/* Category */}
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <List size={18} style={{ color: colors.primary }} />
                Category
              </Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Feedback */}
            {errors.map((err, idx) => (
              <Alert variant="danger" key={idx}>
                {err}
              </Alert>
            ))}

            {uploadSuccess && (
              <Alert variant="success">Video added successfully!</Alert>
            )}

            {/* Submit */}
            <Button
              type="submit"
              style={{
                backgroundColor: colors.primary,
                borderColor: colors.primary,
                fontWeight: '600',
                fontSize: '1rem',
                padding: '10px',
                borderRadius: '10px',
              }}
              className="w-100 d-flex align-items-center justify-content-center gap-2"
            >
              <UploadCloud size={20} />
              Add Video
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddNewVideo;
