import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate(); // initialize navigate

  const green = '#2BCB9A';

  // List of cards with optional path to navigate
  const cards = [
    { title: 'Manage Courses', desc: 'Add or edit course content.', path: '/admin/manage-courses' },
    { title: 'Manage Quizzes', desc: 'Create or update quizzes.', path: '/admin/manage-quizzes' },
    { title: 'Upload Videos', desc: 'Add new educational videos.', path: '/admin/upload-videos' },
    { title: 'Manage Accounts', desc: 'View and control user accounts.', path: '/admin/manage-accounts' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <TopNavbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <main
        style={{
          marginLeft: sidebarOpen ? '250px' : '0',
          padding: '2rem',
          marginTop: '60px',
          minHeight: 'calc(100vh - 60px)',
          backgroundColor: '#f9f9f9',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <h2 className="mb-5" style={{ color: green, fontWeight: '700' }}>
          Welcome to PrepPal Admin Dashboard
        </h2>

        <div className="row">
          {cards.map(({ title, desc, path }, i) => (
            <div key={i} className="col-md-3 mb-4">
              <div
                className="card shadow-sm border-0"
                style={{
                  borderTop: `5px solid ${green}`,
                  borderRadius: '12px',
                  transition: 'transform 0.2s',
                  cursor: path ? 'pointer' : 'default', // pointer only if path exists
                  backgroundColor: 'white',
                }}
                onClick={() => path && navigate(path)}  // navigate on click if path exists
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div className="card-body text-center">
                  <h5 style={{ color: green, fontWeight: '600' }}>{title}</h5>
                  <p className="text-muted">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

