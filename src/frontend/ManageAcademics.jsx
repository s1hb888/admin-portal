import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFont, FaLanguage, FaCalculator } from 'react-icons/fa';

const ManageAcademics = () => {
  const navigate = useNavigate();

  const red = '#EF3349';
  const green = '#2BCB9A';
  const cardBackground = '#e1f8f2';
  const textDark = '#222';

  const cards = [
    {
      title: 'English Alphabets',
      desc: 'Manage English A to Z alphabets.',
      icon: <FaFont size={28} color={red} />,
      path: '/admin/alphabet-crud',
    },
    {
      title: 'Urdu Alphabets',
      desc: 'Manage Urdu Alif to Yay alphabets.',
      icon: <FaLanguage size={28} color={red} />,
      path: '/admin/urdu-crud',
    },
    {
      title: 'Maths',
      desc: 'Manage numbers.',
      icon: <FaCalculator size={28} color={red} />,
      path: '/admin/maths-crud',
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
            Manage Academic Content
          </h2>
          <p style={{ color: '#555', fontSize: '1rem', marginTop: '10px' }}>
            Manage learning content like Alphabets and more.
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
              className="col-md-3 mb-4"
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

export default ManageAcademics;
