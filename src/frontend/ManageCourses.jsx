import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaGlobe, FaArrowRight, FaGraduationCap, FaChartLine, FaUsers } from "react-icons/fa";

const ManageCourses = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const red = "#EF3349";
  const green = "#2BCB9A";
  const yellow = "#FFCF25";
  const textDark = "#222";
  const textMuted = "#6c757d";

  const cards = [
    {
      title: "Academic Learning",
      desc: "Access and manage academic subjects and study material.",
      icon: <FaBookOpen size={32} />,
      path: "/admin/manage-academics",
      color: red,
    },
    {
      title: "General Knowledge",
      desc: "Explore the content to enhance general knowledge.",
      icon: <FaGlobe size={32} />,
      path: "/admin/manage-gk",
      color: green,
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
          Course Management
        </h1>
        <p style={{ 
          color: textMuted, 
          fontSize: '1rem',
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          Select a course category to manage content, subjects, and learning materials
        </p>
      </div>

      {/* Course Cards */}
      <div style={{ 
        maxWidth: '1000px', 
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
              width: '450px',
              height: '320px'
            }}
          >
            <div
              className="course-card"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => card.path && navigate(card.path)}
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
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourses;