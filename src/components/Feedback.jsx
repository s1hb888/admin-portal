import React, { useEffect, useState } from 'react'; 
import { Card } from 'react-bootstrap';
import axios from 'axios';

// CRM theme colors
const red = '#EF3349';
const themeGreen = '#2BCB9A';
const themeYellow = '#FFCF25';

// Map difficulty to CRM colors
const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'very easy':
    case 'easy':
      return themeYellow; // yellow
    case 'medium':
      return themeGreen; // green
    case 'hard':
    case 'challenging':
      return red; // red
    default:
      return '#6c757d'; // gray fallback
  }
};

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get('http://localhost:5000/api/insights/feedbacks', config);
        setFeedbacks(res.data.reverse()); // latest first
      } catch (err) {
        console.error('Error fetching feedbacks', err);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <Card className="shadow-sm" style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}>
      <Card.Body className="p-4">
        <h5 className="mb-1" style={{ fontWeight: '600' }}>Parent's Feedback</h5>
        <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>Latest feedback from parents</p>

        {feedbacks.map((fb, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between py-3"
            style={{ borderBottom: index < feedbacks.length - 1 ? '1px solid #f0f0f0' : 'none' }}
          >
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#e1f8f2',
                  color: red, // red first letter
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                {fb.email[0]}
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>{fb.email}</div>
                <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                  {fb.suggestions || 'No feedback provided'}
                </div>
              </div>
            </div>
            <div
              className="badge text-white py-1 px-3"
              style={{
                backgroundColor: getDifficultyColor(fb.difficulty),
                borderRadius: '16px',
                fontSize: '0.8rem',
              }}
            >
              {fb.difficulty || 'N/A'}
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Feedback;
