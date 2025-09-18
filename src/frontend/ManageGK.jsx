import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAppleAlt, FaCarrot, FaBookOpen, FaChild, FaFont, FaHashtag } from 'react-icons/fa';

const ManageGK = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // ✅ modal state

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
      title: 'Counting (1-10)',
      desc: 'Manage numbers from 1 to 10.',
      icon: <FaHashtag size={28} color={red} />,
      path: '/admin/counting-crud',
    },
    {
      title: 'Islamic Studies',
      desc: 'Manage Islamic knowledge and values.',
      icon: <FaBookOpen size={28} color={red} />,
      path: null, // ✅ direct path nahi, popup khulega
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
            Manage General Knowledge Content
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
                onClick={() =>
                  title === 'Islamic Studies'
                    ? setShowModal(true) // ✅ modal open
                    : path && navigate(path)
                }
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

      {/* ✅ Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '2rem',
              borderRadius: '12px',
              width: '350px',
              textAlign: 'center',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 style={{ marginBottom: '1.5rem', color: green }}>
              Islamic Studies Options
            </h4>

            <button
              onClick={() => navigate('/admin/dua-crud')}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: green,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Manage Dua
            </button>

            <button
              onClick={() => navigate('/admin/basic-questions-crud')}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                backgroundColor: red,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Manage Basic Questions
            </button>
          </div>
        </div>
      )}

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
