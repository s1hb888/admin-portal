import React, { useEffect, useState } from 'react';
import { Button, Card, Spinner, Collapse } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { FaEnvelope, FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';

const themeGreen = '#2BCB9A';
const themeYellow = '#FFCF25';
const lightYellow = '#FFF9C4';
const lightGreen = '#E9FBF6';
const black = '#000';

const ManageAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null); // for view toggle

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/insights');
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
      const res = await axios.put(`http://localhost:5000/api/insights/toggle-status/${id}`);
      const updated = accounts.map((acc) => (acc._id === id ? res.data : acc));
      setAccounts(updated);
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const getFirstLetter = (name) => {
    if (!name) return '?';
    return name.trim().split(' ')[0][0].toUpperCase();
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f5f5f5' }}>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <TopNavbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <main
        style={{
          marginLeft: sidebarOpen ? '295px' : '0',
          padding: '2rem',
          marginTop: '3rem', // increased top margin
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="success" />
          </div>
        ) : accounts.length === 0 ? (
          <Card className="shadow-sm p-4">
            No parent accounts found.
          </Card>
        ) : (
          <div className="d-flex flex-column gap-3">
            {accounts.map((acc, index) => (
              <Card
                key={index}
                className="shadow-sm"
                style={{
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  padding: '1rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  {/* Left Info */}
                  <div className="d-flex align-items-center" style={{ gap: '1rem' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: acc.isActive ? themeGreen : themeYellow,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: '1.2rem',
                      }}
                    >
                      {getFirstLetter(acc.kidName)}
                    </div>
                    <div>
                      <h6 style={{ margin: 0, fontWeight: '600', color: black }}>{acc.kidName}</h6>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <FaEnvelope /> {acc.email}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="d-flex align-items-center" style={{ gap: '0.8rem' }}>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        padding: '0.4rem 0.7rem',
                        borderRadius: '12px',
                        backgroundColor: acc.isActive ? themeGreen : themeYellow,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      {acc.isActive ? <FaCheckCircle /> : <FaTimesCircle />}
                      {acc.isActive ? 'Active' : 'Inactive'}
                    </span>

                    <Button
                      size="sm"
                      style={{
                        backgroundColor: acc.isActive ? themeYellow : themeGreen,
                        borderColor: acc.isActive ? themeYellow : themeGreen,
                        fontWeight: '500',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                      onClick={() => toggleStatus(acc._id)}
                    >
                      {acc.isActive ? 'Deactivate' : 'Activate'}
                    </Button>

                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                      style={{ color: acc.isActive ? themeGreen : themeYellow, fontWeight: '600' }}
                    >
                      <FaEye />
                    </Button>
                  </div>
                </div>

                {/* Expanded Info */}
                <Collapse in={expandedIndex === index}>
                  <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#333' }}>
                    <p><strong>Kid Name:</strong> {acc.kidName}</p>
                    <p><strong>Email:</strong> {acc.email}</p>
                    <p><strong>Status:</strong> {acc.isActive ? 'Active' : 'Inactive'}</p>
                  </div>
                </Collapse>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageAccounts;
