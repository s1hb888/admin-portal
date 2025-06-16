import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const TopNavbar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <nav
      className="navbar navbar-expand shadow-sm sticky-top"
      style={{
        marginLeft: sidebarOpen ? '295px' : '0',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e1f8f2', // Light green background
        borderBottom: '3px solid #EF3349', // Red bottom line
        userSelect: 'none',
        transition: 'margin-left 0.3s ease',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <form className="d-flex align-items-center w-75" style={{ maxWidth: '700px' }}>
        <Search size={22} color="#EF3349" className="me-2" strokeWidth={2.5} />
        <input
          className="form-control"
          type="search"
          placeholder="Search..."
          style={{
            borderRadius: '24px',
            borderColor: '#fff',
            color: '#333',
            backgroundColor: '#fff',
            height: '40px',
            fontSize: '1rem',
            paddingLeft: '16px',
          }}
        />
      </form>

      <div className="d-flex align-items-center gap-4" style={{ fontSize: '1.4rem' }}>
        <User color="#EF3349" strokeWidth={2.5} style={{ cursor: 'pointer' }} title="Profile" />
        <Bell color="#EF3349" strokeWidth={2.5} style={{ cursor: 'pointer' }} title="Notifications" />
      </div>
    </nav>
  );
};

export default TopNavbar;
