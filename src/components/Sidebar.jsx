import React from 'react'; 
import { Video } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Mic,
  Users,
  User,
  LogIn,
  LogOut,
  Menu,
} from 'lucide-react';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const red = '#EF3349';
  const lightGreen = '#e1f8f2';
  const green = '#2BCB9A';

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} color={red} />, path: '/ ' },
    { label: 'Courses', icon: <BookOpen size={18} color={red} />, path: '/admin/manage-courses' },
    { label: 'Quizzes', icon: <Mic size={18} color={red} />, path: '/admin/manage-quizzes' },
    { label: 'Manage Videos', icon: <Video size={18} color={red} />, path: '/admin/manage-videos' },
    { label: 'Manage Accounts', icon: <Users size={18} color={red} />, path: '/admin/manage-accounts' },
    { label: 'Profile', icon: <User size={18} color={red} />, path: '/admin/profile' },
    { label: 'Login', icon: <LogIn size={18} color={red} />, path: '/admin/login' },
    { label: 'Logout', icon: <LogOut size={18} color={red} />, path: '/admin/logout' },
  ];

  return (
    <div
      style={{
        width: sidebarOpen ? '295px' : '0',
        backgroundColor: lightGreen,
        color: '#333',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        overflowX: 'hidden',
        transition: 'width 0.5s ease',
        boxShadow: sidebarOpen ? '2px 0 8px rgba(0,0,0,0.15)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        
      }}
    >
      {/* Toggle button */}
      {sidebarOpen && (
        <div
          style={{
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            borderBottom: `3px solid rgba(239, 51, 73, 0.9)`, // consistent with top navbar
            cursor: 'pointer',
            justifyContent: 'flex-end',
            userSelect: 'none',
          }}
          onClick={toggleSidebar}
          title="Hide Sidebar"
        >
          <Menu size={24} color={red} />
        </div>
      )}

      {/* Menu Items */}
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
            color: green, // changed to match home screen
            textAlign: 'center',
            marginBottom: '40px',
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
                  backgroundColor: active ? red : 'transparent',
                  padding: '14px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  transition: 'background-color 0.3s',
                  marginBottom: '16px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    color: active ? '#fff' : red,
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
                      color: active ? '#fff' : '#333',
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


