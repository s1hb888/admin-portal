import React from 'react';
import { Bell, MessageSquare, Search, Menu } from 'lucide-react';

const TopNavbar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <nav
      className="navbar navbar-expand shadow-sm sticky-top"
      style={{
        marginLeft: sidebarOpen ? '250px' : '0',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2BCB9A', // Set background to green
        borderBottom: '3px solid #2BCB9A',
        userSelect: 'none',
        transition: 'margin-left 0.3s ease',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      {/* Hamburger toggle */}
     

      <form className="d-flex align-items-center w-50" style={{ maxWidth: '600px' }}>
        <Search size={18} color="#fff" className="me-2" />
        <input
          className="form-control form-control-sm"
          type="search"
          placeholder="Search..."
          style={{
            borderRadius: '20px',
            borderColor: '#fff',
            color: '#333',
            backgroundColor: '#fff',
          }}
        />
      </form>

      <div className="d-flex align-items-center gap-4" style={{ fontSize: '1.25rem' }}>
        <MessageSquare color="#fff" style={{ cursor: 'pointer' }} title="Messages" />
        <Bell color="#fff" style={{ cursor: 'pointer' }} title="Notifications" />
      </div>
    </nav>
  );
};

export default TopNavbar;
