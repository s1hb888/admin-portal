import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Mic,
  Video,
  Users,
  Settings,
  LogOut as LogOutIcon,
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const red = '#EF3349';
  const lightGreen = '#e1f8f2';
  const yellow = '#FFCF25';
  const lightGray = '#f8f9fa';
  const darkGray = '#555';

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={24} />, path: '/admin/crm' },
    { label: 'Courses', icon: <BookOpen size={24} />, path: '/admin/manage-courses' },
    { label: 'Quizzes', icon: <Mic size={24} />, path: '/admin/manage-quizzes' },
    { label: 'Videos', icon: <Video size={24} />, path: '/admin/manage-videos' },
    { label: 'Accounts', icon: <Users size={24} />, path: '/admin/manage-accounts' },
    { label: 'Settings', icon: <Settings size={24} />, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    console.log('Logout clicked');
    navigate('/admin/login');
  };

  return (
    <div
      style={{
        width: '280px',
        backgroundColor: '#fff',
        color: '#333',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        // boxShadow: '2px 0 8px rgba(0,0,0,0.15)', // Removed this line
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      {/* Branding (unchanged) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '0 20px',
          height: '80px',
          borderBottom: `1px solid ${lightGreen}`,
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            background: red,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '700',
            fontSize: '1.4rem',
            flexShrink: 0,
          }}
        >
          P
        </div>
        <div>
          <h3 style={{ margin: 0, fontWeight: '700', fontSize: '1.5rem', color: '#222', whiteSpace: 'nowrap' }}>PrepPal</h3>
          <p style={{ margin: 0, fontSize: '1rem', color: '#666', whiteSpace: 'nowrap' }}>Learning Management</p>
        </div>
      </div>

      {/* Menu Items */}
      <div style={{ flex: 1, padding: '16px 18px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map((item, index) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <li
                key={index}
                onClick={() => navigate(item.path)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '14px',
                  background: active ? lightGreen : 'transparent',
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '22px',
                  marginBottom: '16px',
                  transition: 'all 0.3s',
                  position: 'relative',
                  color: active ? darkGray : '#333',
                  fontWeight: active ? '600' : '500',
                  fontSize: '1.05rem',
                }}
              >
                <span style={{ color: red }}>{item.icon}</span>
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Admin Profile + Logout */}
      <div
        style={{
          margin: '15px 15px 20px 15px',
          padding: '18px',
          borderRadius: '12px',
          background: lightGray,
          border: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: yellow,
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            AS
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Admin Sarah</div>
            <div style={{ fontSize: '0.85rem', color: '#888' }}>Online</div>
          </div>
        </div>
        <div onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '6px' }}>
          <LogOutIcon size={26} color={red} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
