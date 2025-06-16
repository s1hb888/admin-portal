import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { FaBook, FaQuestionCircle, FaUsers, FaVideo } from 'react-icons/fa';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const red = '#EF3349';
  const green = '#2BCB9A';
  const cardBackground = '#e1f8f2';
  const textDark = '#222';

  const cards = [
    {
      title: 'Course Management',
      desc: 'Add, update, or remove learning content and categories.',
      icon: <FaBook size={28} color={red} />,
      path: '/admin/manage-courses',
    },
    {
      title: 'Quiz Builder',
      desc: 'Design and manage voice-based and MCQ quizzes.',
      icon: <FaQuestionCircle size={28} color={red} />,
      path: '/admin/manage-quizzes',
    },
    {
      title: 'Video Library',
      desc: 'Upload, review, or delete educational videos.',
      icon: <FaVideo size={28} color={red} />,
      path: '/admin/manage-videos',
    },
    {
      title: 'Control User Access',
      desc: 'Quickly activate/deactivate profiles as needed.',
      icon: <FaUsers size={28} color={red} />,
      path: '/admin/manage-accounts',
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <TopNavbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <main
        style={{
          marginLeft: sidebarOpen ? '295px' : '0',
          padding: '2rem',
          minHeight: 'calc(100vh - 60px)',
          backgroundColor: '#fff',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: green, fontWeight: '700', fontSize: '2.2rem' }}>
            PrepPal Admin Dashboard
          </h2>
          <p style={{ color: '#555', fontSize: '1rem', marginTop: '10px' }}>
            Manage content, media, quizzes, and users from one place.
          </p>
        </div>

        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {cards.map(({ title, desc, icon, path }, i) => (
            <div key={i} className="col-md-4 mb-4" style={{ padding: '0 15px', maxWidth: '350px' }}>
              <div
                className="card shadow-sm border-0 card-hover"
                style={{
                  borderTop: `5px solid ${green}`,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  backgroundColor: cardBackground,
                  transition: 'all 0.3s ease',
                  minHeight: '230px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
                onClick={() => path && navigate(path)}
              >
                <div className="card-body text-center" style={{ padding: '2rem 1rem' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      margin: '0 auto 15px',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    }}
                  >
                    {icon}
                  </div>
                  <h5 className="card-title" style={{ color: textDark, fontWeight: '700', fontSize: '1.1rem' }}>
                    {title}
                  </h5>
                  <p className="card-text" style={{ color: '#666', fontSize: '0.95rem' }}>
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <style>
        {`
          .card-hover:hover {
            background-color: ${green} !important;
            color: white !important;
            transform: scale(1.04);
          }
          .card-hover:hover .card-title,
         {
            color: white !important;
          }
        `}
      </style>
    </div>
  );
};

export default AdminDashboard;
