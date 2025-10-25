import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaCheckCircle, FaLock, FaUserShield, FaFileContract, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const red = '#EF3349';
const green = '#2BCB9A';
const yellow = '#FFCF25';

function Terms() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 1,
      icon: <FaUserShield size={20} color={green} />,
      title: "Account Management",
      items: [
        "Admins must provide accurate and up-to-date information while creating or managing accounts.",
        "Admin login credentials are strictly confidential and must not be shared with unauthorized users.",
        "Two-factor authentication is recommended for enhanced security.",
        "Admins are responsible for maintaining the confidentiality of their account credentials."
      ]
    },
    {
      id: 2,
      icon: <FaLock size={20} color={red} />,
      title: "Data Privacy & Security",
      items: [
        "All user data must be handled in accordance with applicable data protection regulations.",
        "Admins must not access, share, or misuse parent or student information for unauthorized purposes.",
        "Regular password updates are required to maintain account security.",
        "Any suspected security breaches must be reported immediately."
      ]
    },
    {
      id: 3,
      icon: <FaFileContract size={20} color={yellow} />,
      title: "Content Management",
      items: [
        "Admins are authorized to manage and update platform content, quizzes, and learning materials responsibly.",
        "All content must be appropriate for the target age group and educational standards.",
        "Admins must ensure accuracy and quality of educational materials before publishing.",
        "Unauthorized modifications or deletion of critical content is strictly prohibited."
      ]
    },
    {
      id: 4,
      icon: <FaCheckCircle size={20} color={green} />,
      title: "Administrative Responsibilities",
      items: [
        "Admins are responsible for managing parent accounts, including activation, deactivation, and updates.",
        "Regular monitoring of platform activity and user engagement is required.",
        "Admins must respond to parent inquiries and concerns in a timely manner.",
        "Misuse of admin privileges is strictly prohibited and may result in account suspension."
      ]
    }
  ];

  return (
    <div className="min-vh-100 d-flex position-relative" style={{ background: "#f3f4f6" }}>
      {/* Animated Background Blobs */}
      <div className="position-absolute" 
        style={{ 
          top: "10%", 
          right: "5%", 
          width: "300px", 
          height: "300px",
          background: `radial-gradient(circle, ${red}26 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "float 6s ease-in-out infinite"
        }}></div>
      <div className="position-absolute" 
        style={{ 
          bottom: "10%", 
          left: "10%", 
          width: "250px", 
          height: "250px",
          background: `radial-gradient(circle, ${green}26 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite reverse"
        }}></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.8s ease-out; }
        .section-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .section-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
        }
        .section-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .section-content.expanded {
          max-height: 500px;
        }
      `}</style>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            {/* Header Card */}
            <div className="card border-0 shadow-lg fade-in mb-4" 
                 style={{ borderRadius: "24px", overflow: "hidden" }}>
              {/* Solid Header */}
              <div style={{ 
                background: green,
                padding: "3rem 2rem"
              }}>
                <div className="text-center text-white">
                  <div className="mb-3">
                    <div className="d-inline-flex align-items-center justify-content-center"
                         style={{ 
                           width: "80px", 
                           height: "80px", 
                           background: "rgba(255,255,255,0.2)",
                           borderRadius: "20px",
                           backdropFilter: "blur(10px)"
                         }}>
                      <FaShieldAlt size={40} color="white" />
                    </div>
                  </div>
                  <h1 className="mb-2" style={{ fontSize: "2.5rem", fontWeight: "800", letterSpacing: "-0.5px" }}>
                    Terms & Conditions
                  </h1>
                  <p className="mb-0" style={{ fontSize: "1.1rem", opacity: 0.95 }}>
                    Admin Portal Agreement
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="card-body p-4 p-lg-5">
                {/* Introduction */}
                <div className="mb-5">
                  <div className="d-flex align-items-start mb-4">
                    <div className="flex-shrink-0 me-3"
                         style={{ 
                           width: "50px", 
                           height: "50px", 
                           background: `${green}15`,
                           borderRadius: "12px",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center"
                         }}>
                      <FaFileContract size={24} color={green} />
                    </div>
                    <div>
                      <h5 className="mb-2" style={{ fontWeight: "700", color: "#1f2937" }}>
                        Welcome to PrepPal Admin Portal
                      </h5>
                      <p className="text-muted mb-0" style={{ fontSize: "0.95rem", lineHeight: "1.7" }}>
                        By accessing and using this application, you agree to comply with and be bound by the following terms and conditions. Please review them carefully before proceeding.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expandable Sections */}
                <div className="mb-4">
                  <h5 className="mb-4" style={{ fontWeight: "700", color: "#1f2937" }}>
                    Key Terms & Policies
                  </h5>
                  {sections.map((section, index) => (
                    <div key={section.id} className="mb-3">
                      <div 
                        className="card border-0 section-card"
                        style={{ 
                          borderRadius: "16px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                          overflow: "hidden"
                        }}
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <div className="me-3 flex-shrink-0"
                                   style={{ 
                                     width: "45px", 
                                     height: "45px", 
                                     background: "#f9fafb",
                                     borderRadius: "12px",
                                     display: "flex",
                                     alignItems: "center",
                                     justifyContent: "center"
                                   }}>
                                {section.icon}
                              </div>
                              <div>
                                <h6 className="mb-0" style={{ fontWeight: "600", color: "#1f2937" }}>
                                  {section.title}
                                </h6>
                              </div>
                            </div>
                            <div>
                              {expandedSection === section.id ? 
                                <FaChevronUp size={18} color="#6b7280" /> : 
                                <FaChevronDown size={18} color="#6b7280" />
                              }
                            </div>
                          </div>
                          
                          <div className={`section-content ${expandedSection === section.id ? 'expanded' : ''}`}>
                            <div className="mt-4 pt-3" style={{ borderTop: "1px solid #f3f4f6" }}>
                              <ul className="mb-0" style={{ paddingLeft: "1.5rem" }}>
                                {section.items.map((item, idx) => (
                                  <li key={idx} className="mb-2" style={{ 
                                    fontSize: "0.9rem", 
                                    color: "#4b5563",
                                    lineHeight: "1.7"
                                  }}>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Important Notice */}
                <div className="alert border-0 d-flex align-items-start mb-4"
                     style={{ 
                       borderRadius: "16px", 
                       backgroundColor: `${yellow}15`,
                       border: `2px solid ${yellow}40`,
                       padding: "20px"
                     }}>
                  <div className="flex-shrink-0 me-3"
                       style={{ 
                         width: "40px", 
                         height: "40px", 
                         background: yellow,
                         borderRadius: "10px",
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center"
                       }}>
                    <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                  </div>
                  <div>
                    <h6 className="mb-2" style={{ fontWeight: "600", color: "#92400e" }}>
                      Important Notice
                    </h6>
                    <p className="mb-0" style={{ fontSize: "0.9rem", color: "#78350f", lineHeight: "1.6" }}>
                      Violation of these terms may result in immediate suspension or termination of admin access. Any misuse of admin privileges, unauthorized data access, or security breaches will be taken seriously and may result in legal action.
                    </p>
                  </div>
                </div>

                {/* Acceptance Box */}
                <div className="card border-0 mb-4"
                     style={{ 
                       borderRadius: "16px",
                       background: `${green}08`,
                       border: `2px solid ${green}30`
                     }}>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start">
                      <FaCheckCircle size={24} color={green} className="me-3 mt-1 flex-shrink-0" />
                      <div>
                        <h6 className="mb-2" style={{ fontWeight: "600", color: "#1f2937" }}>
                          By accessing this portal, you confirm:
                        </h6>
                        <ul className="mb-0" style={{ paddingLeft: "1.5rem" }}>
                          <li style={{ fontSize: "0.9rem", color: "#4b5563", marginBottom: "8px" }}>
                            You have read and understood these terms and conditions
                          </li>
                          <li style={{ fontSize: "0.9rem", color: "#4b5563", marginBottom: "8px" }}>
                            You agree to comply with all policies outlined above
                          </li>
                          <li style={{ fontSize: "0.9rem", color: "#4b5563" }}>
                            You will use admin privileges responsibly and ethically
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="text-center mb-4">
                  <small className="text-muted">
                    Last updated: {new Date().toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </small>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Link 
                    to="/admin/login" 
                    className="btn btn-lg text-white fw-semibold px-5 py-3"
                    style={{
                      background: green,
                      borderRadius: "14px",
                      border: "none",
                      boxShadow: `0 6px 16px ${green}40`,
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = `0 10px 24px ${green}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = `0 6px 16px ${green}40`;
                    }}
                  >
                    I Accept & Continue
                  </Link>
                  <Link 
                    to="/admin/login" 
                    className="btn btn-lg fw-semibold px-5 py-3"
                    style={{
                      background: "white",
                      borderRadius: "14px",
                      border: "2px solid #e5e7eb",
                      color: "#6b7280",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.background = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.background = "white";
                    }}
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-muted small mb-0">
                © {new Date().getFullYear()} PrepPal. All rights reserved. | 
                <a href="#" className="text-decoration-none ms-2" style={{ color: green }}>Privacy Policy</a> | 
                <a href="#" className="text-decoration-none ms-2" style={{ color: green }}>Contact Support</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;