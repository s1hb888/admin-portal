import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaGlobe } from "react-icons/fa";

const ManageCourses = () => {
  const navigate = useNavigate();

  const red = "#EF3349";
  const green = "#2BCB9A";
  const cardBackground = "#e1f8f2";
  const textDark = "#222";

  const cards = [
    {
      title: "Academic Learning",
      desc: "Access and manage academic subjects and study material.",
      icon: <FaBookOpen size={28} color={red} />,
      path: "/admin/manage-academics", // 👈 ManageAcademics page
    },
    {
      title: "General Knowledge",
      desc: "Explore the content to enhance general knowledge.",
      icon: <FaGlobe size={28} color={red} />,
      path: "/admin/manage-gk", // 👈 ManageGK page
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Main Content */}
      <main
        style={{
          padding: "5rem",
          minHeight: "100vh",
          backgroundColor: "#fff",
          transition: "margin-left 0.3s ease",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ color: green, fontWeight: "700", fontSize: "2.2rem" }}>
            Courses Management
          </h2>
        </div>

        {/* Cards */}
        <div
          className="row"
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {cards.map(({ title, desc, icon, path }, i) => (
            <div
              key={i}
              className="col-md-2 mb-4"
              style={{ padding: "0 15px", maxWidth: "350px" }}
            >
              <div
                className="card shadow-sm border-0 card-hover"
                style={{
                  borderTop: `5px solid ${green}`,
                  borderRadius: "16px",
                  cursor: "pointer",
                  backgroundColor: cardBackground,
                  transition: "all 0.3s ease",
                  minHeight: "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                onClick={() => path && navigate(path)}
              >
                <div
                  className="card-body text-center"
                  style={{ padding: "5rem 3rem" }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      margin: "0 auto 15px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    {icon}
                  </div>
                  <h5
                    className="card-title"
                    style={{
                      color: textDark,
                      fontWeight: "700",
                      fontSize: "1.1rem",
                    }}
                  >
                    {title}
                  </h5>
                  <p
                    className="card-text"
                    style={{ color: "#666", fontSize: "0.95rem" }}
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

export default ManageCourses;
