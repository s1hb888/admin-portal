import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import Dashboard from './Dashboard'; // Assuming you have this component

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#e9ecef' }}>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content wrapper */}
      <div
        style={{
          flexGrow: 1,
          transition: 'margin-left 0.4s ease',
          marginLeft: sidebarOpen ? '280px' : '0',
          padding: '2rem',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            minHeight: 'calc(100vh - 4rem)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TopNavbar />
          <main style={{ flexGrow: 1, padding: '2rem' }}>
            {/* Main content of your dashboard */}
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;