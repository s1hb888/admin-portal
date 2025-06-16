import React, { useEffect, useState } from 'react';
import { Button, Alert, Card, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { FaEnvelope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const themeGreen = '#2BCB9A';
const themeYellow = '#FFCF25';
const lightYellow = '#FFF9C4';
const lightGreen = '#E9FBF6';
const black = '#000';

const ManageAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null); // for hover effect

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setAccounts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch accounts:', err);
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const toggleStatus = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/users/toggle-status/${id}`);
      const updated = accounts.map((acc) => (acc._id === id ? res.data : acc));
      setAccounts(updated);
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#ffffff' }}>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <TopNavbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <main
        style={{
          marginLeft: sidebarOpen ? '295px' : '0',
          padding: '2rem',
          marginTop: '0px',
          minHeight: '100vh',
          backgroundColor: '#ffffff',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            className="mb-4"
            style={{
              color: themeGreen,
              textAlign: 'center',
              fontWeight: '700',
              fontSize: '2rem',
              marginTop: '0px',
            }}
          >
            User Account Management
          </h2>

          {loading ? (
            <div className="d-flex justify-content-center mt-5">
              <Spinner animation="border" variant="success" />
            </div>
          ) : accounts.length === 0 ? (
            <Alert style={{ backgroundColor: themeYellow, fontWeight: '500' }}>
              No parent accounts found.
            </Alert>
          ) : (
            <Row xs={1} md={2} className="g-4">
              {accounts.map((acc, index) => (
                <Col key={index}>
                  <Card
  onMouseEnter={() => setHoveredCard(index)}
  onMouseLeave={() => setHoveredCard(null)}
  style={{
    borderColor: themeGreen,
    borderRadius: '12px',
    backgroundColor:
      hoveredCard === index
        ? themeGreen
        : acc.isActive
        ? lightGreen
        : lightYellow,
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.4s ease',
    opacity: acc.isActive ? 1 : 0.75,
    transform: hoveredCard === index ? 'translateY(-5px)' : 'translateY(0)', // ✅ added move effect
  }}
  className="h-100"
>

                    <Card.Body>
                      <Card.Title
                        style={{
                          color: themeYellow,
                          fontSize: '1.3rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                        }}
                      >
                        {acc.kidName}
                      </Card.Title>

                      <Card.Text
                        style={{
                          color: black,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <FaEnvelope /> <strong>Email:</strong> {acc.email}
                      </Card.Text>

                      <Card.Text
                        style={{
                          color: acc.isActive ? 'green' : 'red',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <strong>Status:</strong>{' '}
                        {acc.isActive ? (
                          <>
                            <FaCheckCircle /> Active
                          </>
                        ) : (
                          <>
                            <FaTimesCircle /> Inactive
                          </>
                        )}
                      </Card.Text>

                      <div className="d-flex justify-content-end mt-3">
                        <Button
                          size="sm"
                          style={{
                            backgroundColor: acc.isActive ? '#EF3349' : themeGreen,
                            borderColor: acc.isActive ? '#EF3349' : themeGreen,
                            fontWeight: '500',
                            color: '#fff',
                          }}
                          onClick={() => toggleStatus(acc._id)}
                        >
                          {acc.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageAccounts;
