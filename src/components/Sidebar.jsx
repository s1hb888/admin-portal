import React from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Mic,
  Upload,
  Users,
  User,
  LogIn,
  LogOut,
  Menu, // Hamburger icon
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin' },
    { label: 'Courses', icon: <BookOpen size={18} />, path: '/admin/manage-courses' },
    { label: 'Quizzes', icon: <Mic size={18} />, path: '/admin/manage-quizzes' },
    { label: 'Upload Videos', icon: <Upload size={18} />, path: '/admin/upload-videos' },
    { label: 'Manage Accounts', icon: <Users size={18} />, path: '/admin/manage-accounts' },
    { label: 'Profile', icon: <User size={18} />, path: '/admin/profile' },
    { label: 'Login', icon: <LogIn size={18} />, path: '/admin/login' },
    { label: 'Logout', icon: <LogOut size={18} />, path: '/admin/logout' },
  ];

  return (
    <div
      style={{
        width: sidebarOpen ? '250px' : '0',
        backgroundColor: '#2BCB9A',
        color: 'white',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        overflowX: 'hidden',
        transition: 'width 0.3s ease',
        boxShadow: sidebarOpen ? '2px 0 8px rgba(0,0,0,0.15)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      {/* Toggle button (only visible when sidebar is open) */}
      {sidebarOpen && (
        <div
          style={{
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            borderBottom: '2px solid #2BCB9A',
            cursor: 'pointer',
            justifyContent: 'flex-end',
            userSelect: 'none',
          }}
          onClick={toggleSidebar}
          title="Hide Sidebar"
        >
          <Menu size={24} color="white" />
        </div>
      )}

      {/* Menu items */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: sidebarOpen ? '20px' : '0',
          opacity: sidebarOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
          userSelect: 'none',
        }}
      >
        <h3
          style={{
            fontWeight: '700',
            letterSpacing: '1.2px',
            color: 'white',
            textAlign: 'center',
            marginBottom: '30px',
            userSelect: 'none',
            display: sidebarOpen ? 'block' : 'none',
          }}
        >
          PrepPal Admin
        </h3>

        <ul style={{ listStyle: 'none', paddingLeft: '0', margin: 0 }}>
          {navItems.map((item, index) => {
            const active = location.pathname === item.path;
            return (
              <li
                key={index}
                onClick={() => navigate(item.path)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  backgroundColor: active ? '#EF3349' : 'transparent',
                  padding: '10px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  transition: 'background-color 0.3s',
                  marginBottom: '10px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    opacity: active ? 1 : 0.8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '20px',
                  }}
                >
                  {item.icon}
                </span>
                {sidebarOpen && (
                  <span
                    style={{
                      color: 'white',
                      fontWeight: active ? '600' : '500',
                      fontSize: '1rem',
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
