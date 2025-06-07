import React, { useState, useRef } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { UploadCloud, Tag, FileText, List } from 'lucide-react';
import TopNavbar from '../components/TopNavbar';

const categories = ['Math', 'English', 'Islamic Studies'];

const green = '#2BCB9A';

const UploadVideos = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const videoRef = useRef(null);

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
      errs.push(`File size exceeds the ${MAX_FILE_SIZE_MB}MB limit. Please upload a smaller file.`);
    }

    setErrors(errs);
    setWarnings(warns);
  };

  const checkResolution = () => {
    const videoEl = videoRef.current;
    if (videoEl) {
      if (videoEl.videoWidth < 1280 || videoEl.videoHeight < 720) {
        setWarnings([
          'Low-resolution video detected. Upload a higher-quality video for better learning experience.',
        ]);
      } else {
        setWarnings([]);
      }
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    setWarnings([]);
    setUploadSuccess(false);

    if (!videoFile) {
      setErrors(['Please select a video file to upload.']);
      return;
    }

    if (title.trim() === '') {
      setErrors(['Title is required.']);
      return;
    }

    if (title.length > MAX_TITLE_LENGTH) {
      setErrors([`Title cannot exceed ${MAX_TITLE_LENGTH} characters.`]);
      return;
    }

    if (errors.length === 0) {
      setUploadSuccess(true);

      setVideoFile(null);
      setTitle('');
      setDescription('');
      setCategory(categories[0]);
      e.target.reset();
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      
      {/* Centered Top Navbar */}
      {/* Full width top navbar with centered content */}
<div style={{ width: '100%', borderBottom: `2px solid ${green}`, paddingBottom: '8px' }}>
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <TopNavbar />
  </div>
</div>


      {/* Smaller container to fit screen */}
      <div className="container my-4" style={{ maxWidth: '600px', minHeight: '75vh', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgb(0 0 0 / 0.1)' }}>
        
        <h2 className="mb-3" style={{ color: green, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UploadCloud size={28} />
          Upload Videos
        </h2>
        <p className="mb-4 text-muted" style={{ fontSize: '0.9rem' }}>
          Upload animated videos focusing on educational topics like shapes, numbers, and basic Islamic knowledge.
        </p>

        <Form onSubmit={handleSubmit}>

          {/* Video Input */}
          <Form.Group controlId="videoFile" className="mb-3">
            <Form.Label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
              <UploadCloud size={20} style={{ color: green }} />
              Select Video
            </Form.Label>
            <Form.Control type="file" accept=".mp4" onChange={handleFileChange} />
            {videoFile && (
              <video
                ref={videoRef}
                src={URL.createObjectURL(videoFile)}
                onLoadedMetadata={checkResolution}
                style={{ display: 'none' }}
              />
            )}
          </Form.Group>

          {/* Title */}
          <Form.Group controlId="title" className="mb-3">
            <Form.Label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
              <FileText size={18} style={{ color: green }} />
              Title <small className="text-muted">(max 50 characters)</small>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter video title"
              maxLength={MAX_TITLE_LENGTH}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Text muted>{title.length} / {MAX_TITLE_LENGTH}</Form.Text>
          </Form.Group>

          {/* Description */}
          <Form.Group controlId="description" className="mb-3">
            <Form.Label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
              <Tag size={18} style={{ color: green }} />
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Brief summary of the video content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          {/* Category */}
          <Form.Group controlId="category" className="mb-4">
            <Form.Label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
              <List size={18} style={{ color: green }} />
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

          {/* Errors */}
          {errors.length > 0 &&
            errors.map((err, idx) => (
              <Alert variant="danger" key={idx}>
                {err}
              </Alert>
            ))}

          {/* Warnings */}
          {warnings.length > 0 &&
            warnings.map((warn, idx) => (
              <Alert variant="warning" key={idx}>
                {warn}
              </Alert>
            ))}

          {/* Success message */}
          {uploadSuccess && (
            <Alert variant="success">
              Video uploaded successfully!
            </Alert>
          )}

          <Button
            type="submit"
            style={{ backgroundColor: green, borderColor: green }}
            className="w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <UploadCloud size={20} /> Upload Video
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UploadVideos;


