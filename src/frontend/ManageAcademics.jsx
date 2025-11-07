import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFont, FaLanguage, FaCalculator, FaBookOpen, FaChartLine, FaGraduationCap, FaArrowRight } from 'react-icons/fa';

const ManageAcademics = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const red = '#EF3349';
  const green = '#2BCB9A';
  const yellow = '#FFCF25';
  const textDark = '#222';
  const textMuted = '#6c757d';

  const cards = [
    {
      title: 'English Alphabets',
      desc: 'Manage English A to Z alphabets and pronunciation.',
      icon: <FaFont size={32} />,
      path: '/admin/alphabet-crud',
      color: red,
      bgPattern: 'ABC'
    },
    {
      title: 'Urdu Alphabets',
      desc: 'Manage Urdu Alif to Yay alphabets and pronunciation.',
      icon: <FaLanguage size={32} />,
      path: '/admin/urdu-crud',
      color: green,
      bgPattern: 'اردو'
    },
    {
      title: 'Mathematics',
      desc: 'Manage numbers, counting, and basic math concepts.',
      icon: <FaCalculator size={32} />,
      path: '/admin/maths-crud',
      color: yellow,
      bgPattern: '123'
    },
  ];

  return (
    <div style={{ 
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#f3f4f6',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      {/* Header Section with Visual */}
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
          background: `linear-gradient(135deg, ${red}, ${red}DD)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: `0 10px 30px ${red}40`,
          position: 'relative',
          zIndex: 1
        }}>
          <FaBookOpen size={48} color="#fff" />
        </div>

        <h1 style={{ 
          color: textDark, 
          fontWeight: '700', 
          fontSize: '2rem',
          marginBottom: '0.5rem',
          position: 'relative',
          zIndex: 1
        }}>
          Academic Content Management
        </h1>
        <p style={{ 
          color: textMuted, 
          fontSize: '1rem',
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          Manage educational content including alphabets, numbers, and learning materials
        </p>
      </div>

      {/* Academic Cards */}
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
              className="academic-card"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => card.path && navigate(card.path)}
              style={{
                borderRadius: '16px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                transition: 'all 0.3s cubic-bezier(1, 0, 0.2, 1)',
                transform: hoveredCard === i ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === i 
                  ? '0 2px 40px rgba(0,0,0,0.12)' 
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
                opacity: 1,
                transition: 'opacity 0.3s ease',
                userSelect: 'none',
                pointerEvents: 'none'
              }}>
                
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAcademics;