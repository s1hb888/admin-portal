import React, { useState, useRef } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { UploadCloud, Tag, FileText, List } from 'lucide-react';
import TopNavbar from '../components/TopNavbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const categories = ['Academic Learning', 'General Knowledge'];

const colors = {
  primary: '#2BCB9A', 
  danger: '#EF3349',  
  warning: '#FFCF25', 
  text: '#222',
  background: '#FAFAFA',
};

const UploadVideos = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const videoRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const MAX_FILE_SIZE_MB = 400;
  const MAX_TITLE_LENGTH = 50;

  const bytesToMB = (bytes) => bytes / (1024 * 1024);

  const validateVideo = (file) => {
    const errs = [];
    const warns = [];

    if (!file.name.toLowerCase().endsWith('.mp4')) {
      errs.push('Invalid file format. Please upload an MP4 video.');
    }

    if (bytesToMB(file.size) > MAX_FILE_SIZE_MB) {
      errs.push(`File size exceeds ${MAX_FILE_SIZE_MB}MB. Please upload a smaller file.`);
    }

    setErrors(errs);
    setWarnings(warns);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadSuccess(false);
    setErrors([]);
    setWarnings([]);

    if (file) {
      setVideoFile(file);
      validateVideo(file);
    } else {
      setVideoFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!videoFile) newErrors.push('Please select a video file.');
    if (title.trim() === '') newErrors.push('Title is required.');
    if (title.length > MAX_TITLE_LENGTH) newErrors.push(`Title can't exceed ${MAX_TITLE_LENGTH} characters.`);

    if (videoFile) {
      if (!videoFile.name.toLowerCase().endsWith('.mp4')) {
        newErrors.push('Invalid file format. Only MP4 allowed.');
      }
      if (bytesToMB(videoFile.size) > MAX_FILE_SIZE_MB) {
        newErrors.push(`File too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
      }
    }

    setErrors(newErrors);
    if (newErrors.length > 0) return;

    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);

      const response = await axios.post('http://localhost:5000/api/upload-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadSuccess(true);
      setVideoFile(null);
      setTitle('');
      setDescription('');
      setCategory(categories[0]);
      e.target.reset();
    } catch (err) {
      console.error(err);
      setErrors(['Upload failed. Please try again.']);
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
            Upload Educational Video
          </h3>

          <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '28px' }}>
            Add animated content on topics like shapes, numbers, or Islamic knowledge to the PrepPal library.
          </p>

          <Form onSubmit={handleSubmit}>
            {/* Video Input */}
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UploadCloud size={18} style={{ color: colors.primary }} />
                Video File (MP4)
              </Form.Label>
              <Form.Control type="file" accept=".mp4" onChange={handleFileChange} />
            </Form.Group>

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

            {warnings.map((warn, idx) => (
              <Alert variant="warning" key={idx}>
                {warn}
              </Alert>
            ))}

            {uploadSuccess && (
              <Alert variant="success">Video uploaded successfully!</Alert>
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
              Upload Video
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UploadVideos;
