import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAppleAlt, FaCarrot, FaBookOpen, FaChild, FaFont } from 'react-icons/fa';

const ManageGK = () => {
  const navigate = useNavigate();

  const red = '#EF3349';
  const green = '#2BCB9A';
  const cardBackground = '#e1f8f2';
  const textDark = '#222';

  const cards = [
    {
      title: 'Vowels',
      desc: 'Manage vowels (A, E, I, O, U).',
      icon: <FaFont size={28} color={red} />,
      path: '/admin/vowels-crud',
    },
    {
      title: 'Fruits',
      desc: 'Manage common fruits.',
      icon: <FaAppleAlt size={28} color={red} />,
      path: '/admin/fruits-crud',
    },
    {
      title: 'Vegetables',
      desc: 'Manage common vegetables.',
      icon: <FaCarrot size={28} color={red} />,
      path: '/admin/vegetables-crud',
    },
    {
      title: 'Body Parts',
      desc: 'Manage human body parts.',
      icon: <FaChild size={28} color={red} />,
      path: '/admin/bodyparts-crud',
    },
    {
      title: 'Islamic Studies',
      desc: 'Manage Islamic knowledge and values.',
      icon: <FaBookOpen size={28} color={red} />,
      path: '/admin/islamic-studies-crud',
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Main Content */}
      <main
        style={{
          padding: '2rem',
          minHeight: '100vh',
          backgroundColor: '#fff',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: green, fontWeight: '700', fontSize: '2.2rem' }}>
          Manage  General Knowledge Content
          </h2>
          <p style={{ color: '#555', fontSize: '1rem', marginTop: '10px' }}>
            Manage learning categories like vowels, fruits, vegetables, and more.
          </p>
        </div>

        {/* Cards */}
        <div
          className="row"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {cards.map(({ title, desc, icon, path }, i) => (
            <div
              key={i}
              className="col-md-4 mb-4"
              style={{ padding: '0 15px', maxWidth: '350px' }}
            >
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
                <div
                  className="card-body text-center"
                  style={{ padding: '2rem 1rem' }}
                >
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
                  <h5
                    className="card-title"
                    style={{
                      color: textDark,
                      fontWeight: '700',
                      fontSize: '1.1rem',
                    }}
                  >
                    {title}
                  </h5>
                  <p
                    className="card-text"
                    style={{ color: '#666', fontSize: '0.95rem' }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Hover CSS */}
      <style>
        {`
          .card-hover:hover {
            background-color: ${green} !important;
            color: white !important;
            transform: scale(1.04);
          }
          .card-hover:hover .card-title,
          .card-hover:hover .card-text {
            color: white !important;
          }
        `}
      </style>
    </div>
  );
};

export default ManageGK;
