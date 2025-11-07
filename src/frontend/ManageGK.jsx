import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAppleAlt, FaCarrot, FaBookOpen, FaChild, FaFont, FaHashtag, FaArrowRight, FaGraduationCap, FaBook } from 'react-icons/fa';

const ManageGK = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const red = '#EF3349';
  const green = '#2BCB9A';
  const yellow = '#FFCF25';
  const textDark = '#222';
  const textMuted = '#6c757d';

  const cards = [
    {
      title: 'Vowels',
      desc: 'Manage vowels (A, E, I, O, U) with pronunciation.',
      icon: <FaFont size={32} />,
      path: '/admin/vowels-crud',
      color: red,
      bgPattern: 'AEIOU'
    },
    {
      title: 'Fruits',
      desc: 'Manage common fruits and their properties.',
      icon: <FaAppleAlt size={32} />,
      path: '/admin/fruits-crud',
      color: green,
      bgPattern: '🍎'
    },
    {
      title: 'Vegetables',
      desc: 'Manage common vegetables and nutrition info.',
      icon: <FaCarrot size={32} />,
      path: '/admin/vegetables-crud',
      color: yellow,
      bgPattern: '🥕'
    },
    {
      title: 'Body Parts',
      desc: 'Manage human body parts and their functions.',
      icon: <FaChild size={32} />,
      path: '/admin/bodyparts-crud',
      color: red,
      bgPattern: '👤'
    },
    {
      title: 'Counting (1-10)',
      desc: 'Manage numbers from 1 to 10 with examples.',
      icon: <FaHashtag size={32} />,
      path: '/admin/counting-crud',
      color: green,
      bgPattern: '123'
    },
    {
      title: 'Islamic Studies',
      desc: 'Manage Islamic knowledge, duas, and values.',
      icon: <FaBookOpen size={32} />,
      path: null,
      color: yellow,
      bgPattern: '☪'
    },
  ];

  return (
    <div style={{ 
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#f3f4f6',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      {/* Header Section */}
      <div style={{
        marginBottom: '3rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem',
          opacity: 0.08,
          zIndex: 0
        }}>
        </div>

        {/* Icon Badge */}
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '24px',
          background: `linear-gradient(135deg, ${green}, ${green}DD)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: `0 10px 30px ${green}40`,
          position: 'relative',
          zIndex: 1
        }}>
          <FaGraduationCap size={48} color="#fff" />
        </div>

        <h1 style={{ 
          color: textDark, 
          fontWeight: '700', 
          fontSize: '2rem',
          marginBottom: '0.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          General Knowledge Management
        </h1>
        <p style={{ 
          color: textMuted, 
          fontSize: '1rem',
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          Manage learning categories including vowels, fruits, vegetables, and Islamic studies
        </p>
      </div>

      {/* GK Cards */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center'
      }}>
        {cards.map((card, i) => (
          <div 
            key={i}
            style={{ 
              width: '350px',
              height: '320px'
            }}
          >
            <div
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => 
                card.title === 'Islamic Studies'
                  ? setShowModal(true)
                  : card.path && navigate(card.path)
              }
              style={{
                borderRadius: '16px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === i ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === i 
                  ? '0 20px 40px rgba(0,0,0,0.12)' 
                  : '0 2px 8px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                position: 'relative',
                height: '100%',
                border: 'none'
              }}
            >
              {/* Colored top accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: `linear-gradient(90deg, ${card.color}, ${card.color}DD)`,
              }} />

              {/* Background Pattern */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '80px',
                fontWeight: '900',
                color: `${card.color}10`,
                opacity: hoveredCard === i ? 0.2 : 0.15,
                transition: 'opacity 0.3s ease',
                userSelect: 'none',
                pointerEvents: 'none'
              }}>
                {card.bgPattern}
              </div>

              <div style={{ padding: '2.5rem' }}>
                {/* Icon Container */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: hoveredCard === i 
                    ? `linear-gradient(135deg, ${card.color}, ${card.color}DD)`
                    : '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  transition: 'all 0.3s ease',
                  color: hoveredCard === i ? '#fff' : card.color,
                  boxShadow: hoveredCard === i 
                    ? `0 8px 20px ${card.color}40` 
                    : 'none'
                }}>
                  {card.icon}
                </div>

                {/* Title */}
                <h3 style={{
                  color: textDark,
                  fontWeight: '700',
                  fontSize: '1.5rem',
                  marginBottom: '0.75rem',
                  transition: 'color 0.3s ease'
                }}>
                  {card.title}
                </h3>

                {/* Description */}
                <p style={{
                  color: textMuted,
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  marginBottom: '2rem'
                }}>
                  {card.desc}
                </p>

                {/* Action Button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: card.color,
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'gap 0.3s ease'
                }}>
                  <span>Manage Content</span>
                  <FaArrowRight 
                    size={16} 
                    style={{
                      transition: 'transform 0.3s ease',
                      transform: hoveredCard === i ? 'translateX(5px)' : 'translateX(0)'
                    }}
                  />
                </div>
              </div>

              {/* Decorative gradient overlay on hover */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: `radial-gradient(circle at center, ${card.color}15, transparent)`,
                opacity: hoveredCard === i ? 1 : 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Islamic Studies Modal */}
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
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '2.5rem',
              borderRadius: '16px',
              width: '420px',
              maxWidth: '90%',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              animation: 'slideUp 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: textMuted,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = textDark}
              onMouseLeave={(e) => e.target.style.color = textMuted}
            >
              ×
            </button>

            {/* Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: `linear-gradient(135deg, ${yellow}, ${yellow}DD)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: `0 8px 24px ${yellow}40`
            }}>
              <FaBookOpen size={36} color="#fff" />
            </div>

            <h3 style={{ 
              marginBottom: '0.5rem', 
              color: textDark,
              fontWeight: '700',
              fontSize: '1.5rem'
            }}>
              Islamic Studies
            </h3>
            <p style={{
              color: textMuted,
              fontSize: '0.95rem',
              marginBottom: '2rem'
            }}>
              Choose a category to manage
            </p>

            {/* Option 1 */}
            <button
              onClick={() => navigate('/admin/dua-crud')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '1rem 1.5rem',
                marginBottom: '1rem',
                backgroundColor: '#fff',
                color: textDark,
                border: `2px solid ${green}30`,
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = green;
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = green;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${green}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = textDark;
                e.currentTarget.style.borderColor = `${green}30`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>Manage Dua</span>
              <FaArrowRight size={16} />
            </button>

            {/* Option 2 */}
            <button
              onClick={() => navigate('/admin/basic-questions-crud')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '1rem 1.5rem',
                backgroundColor: '#fff',
                color: textDark,
                border: `2px solid ${red}30`,
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = red;
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = red;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${red}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = textDark;
                e.currentTarget.style.borderColor = `${red}30`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>Manage Basic Questions</span>
              <FaArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { 
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ManageGK;