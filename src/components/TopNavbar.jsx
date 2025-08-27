import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const red = '#EF3349';
const themeGreen = '#2BCB9A'; 
const lightGreen = '#e1f8f2'; 

const TopNavbar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        marginLeft: sidebarOpen ? '280px' : '0',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        userSelect: 'none',
        transition: 'margin-left 0.4s ease',
        padding: '0 2rem', 
        width: sidebarOpen ? 'calc(100% - 280px)' : '100%',
        position: 'fixed',
        top: 0,
        zIndex: 999,
        boxShadow: 'none', 
      }}
    >
      {/* Search Bar */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
          padding: '10px 16px',
          width: '500px', 
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Search size={20} color="#888" style={{ marginRight: '10px' }} />
        <input
          type="search"
          placeholder="Search"
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            outline: 'none',
            boxShadow: 'none',
            fontSize: '1rem',
            padding: '0',
            width: '100%',
          }}
        />
      </div>

      {/* Notifications and Profile Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Notifications Icon with light green background */}
        <div
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: lightGreen, 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: red,
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #fff'
            }}
          >
            3
          </div>
          <Bell size={24} color={themeGreen} /> 
        </div>

        {/* User Profile Section with a border around the image */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Andrew's profile picture container with a border */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '1px solid #ddd', // Added a light gray border
            }}
          >
            {/* Andrew Starlin's picture */}
            <img src="https://via.placeholder.com/40" alt="Andrew Starlin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '1rem' }}>Andrew Starlin</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>Admin</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;