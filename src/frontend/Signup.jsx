import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaShieldAlt, FaUser, FaRocket } from "react-icons/fa";
import { API_BASE_URL } from "./config";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Regex rules
  const usernameRegex = /^[A-Za-z\s]+$/; // only letters + space
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic email validation
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Username validation
    if (!usernameRegex.test(username)) {
      setError("Username should contain only letters and spaces.");
      return;
    }

    // ✅ Email validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // ✅ Password validation
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8–12 characters, include at least 1 uppercase, 1 number, and 1 special character."
      );
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/admins/signup`, {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      // Save token in local storage
      localStorage.setItem("adminToken", res.data.token);

      // Redirect after signup
      navigate("/admin/login");
    } catch (err) {
      console.error("Signup Error:", err.response?.data); // Debugging
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="min-vh-100 d-flex position-relative" style={{ background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)" }}>
      {/* Animated Background Blobs with Different Positions */}
      <div className="position-absolute" 
        style={{ 
          top: "5%", 
          left: "10%", 
          width: "350px", 
          height: "350px",
          background: "radial-gradient(circle, rgba(43, 203, 154, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(70px)",
          animation: "float 7s ease-in-out infinite"
        }}></div>
      <div className="position-absolute" 
        style={{ 
          bottom: "15%", 
          right: "8%", 
          width: "280px", 
          height: "280px",
          background: "radial-gradient(circle, rgba(239, 51, 73, 0.18) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(65px)",
          animation: "float 9s ease-in-out infinite reverse"
        }}></div>
      <div className="position-absolute" 
        style={{ 
          top: "40%", 
          right: "20%", 
          width: "220px", 
          height: "220px",
          background: "radial-gradient(circle, rgba(255, 207, 37, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(55px)",
          animation: "float 6s ease-in-out infinite"
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
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .fade-in { animation: fadeIn 0.8s ease-out; }
        .slide-in-left { animation: slideInLeft 0.8s ease-out; }
        .slide-in-right { animation: slideInRight 0.8s ease-out; }
      `}</style>

      {/* Left Section - Branding */}
      <div className="d-none d-lg-flex col-lg-6 align-items-center justify-content-center p-5 position-relative order-1 order-lg-1">
        <div className="text-center slide-in-left" style={{ maxWidth: "600px", zIndex: 1 }}>
          {/* Logo - Stacked Squares */}
          <div className="mb-5">
            <div className="d-inline-block position-relative">
              <div className="d-flex gap-2 mb-2">
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  background: "linear-gradient(135deg, #2BCB9A 0%, #1fa57a 100%)",
                  borderRadius: "12px",
                  boxShadow: "0 6px 16px rgba(43, 203, 154, 0.3)"
                }}></div>
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  background: "linear-gradient(135deg, #EF3349 0%, #c91d32 100%)",
                  borderRadius: "12px",
                  boxShadow: "0 6px 16px rgba(239, 51, 73, 0.3)"
                }}></div>
              </div>
              <div className="d-flex gap-2">
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  background: "linear-gradient(135deg, #FFCF25 0%, #e6b800 100%)",
                  borderRadius: "12px",
                  boxShadow: "0 6px 16px rgba(255, 207, 37, 0.3)"
                }}></div>
                <div className="d-flex align-items-center justify-content-center" style={{ 
                  width: "40px", 
                  height: "40px", 
                  background: "linear-gradient(135deg, #2BCB9A 0%, #1fa57a 100%)",
                  borderRadius: "12px",
                  boxShadow: "0 8px 20px rgba(43, 203, 154, 0.4)"
                }}>
                  <FaShieldAlt size={20} color="white" />
                </div>
              </div>
            </div>
          </div>

          {/* Simple Title */}
          <h1 className="mb-4" 
              style={{ 
                color: "#1f2937", 
                fontSize: "2.8rem",
                fontWeight: "800",
                letterSpacing: "-1px",
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.2"
              }}>
            PrepPal Admin
          </h1>
          <p className="lead" style={{ color: "#6b7280", fontSize: "1.1rem", lineHeight: "1.7", maxWidth: "500px", margin: "0 auto" }}>
            Empower young minds with innovative educational tools. Join hundreds of educators making a difference.
          </p>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4 order-2 order-lg-2">
        <div className="slide-in-right" style={{ width: "100%", maxWidth: "640px" }}>
          {/* Floating Card Design */}
          <div className="card border-0" 
               style={{ 
                 borderRadius: "28px", 
                 background: "white",
                 boxShadow: "0 25px 70px rgba(0,0,0,0.15), 0 10px 35px rgba(0,0,0,0.1)",
                 overflow: "hidden"
               }}>
            {/* Decorative Top Bar with Gradient */}
            <div style={{ 
              height: "8px", 
              background: "linear-gradient(90deg, #EF3349 0%, #2BCB9A 50%, #FFCF25 100%)"
            }}></div>
            
            <div className="card-body p-4 p-lg-5">
              {/* Header with Different Icon Style */}
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block mb-3">
                  {/* Outer Circle */}
                  <div className="position-absolute"
                       style={{ 
                         width: "90px", 
                         height: "90px", 
                         border: "3px solid #2BCB9A",
                         borderRadius: "50%",
                         top: "-5px",
                         left: "-5px",
                         opacity: "0.3"
                       }}></div>
                  {/* Main Icon Container */}
                  <div className="d-inline-flex align-items-center justify-content-center"
                       style={{ 
                         width: "80px", 
                         height: "80px", 
                         background: "linear-gradient(135deg, #2BCB9A 0%, #1fa57a 100%)",
                         borderRadius: "50%",
                         boxShadow: "0 12px 30px rgba(43, 203, 154, 0.35)"
                       }}>
                    <FaRocket size={36} color="white" />
                  </div>
                </div>
                <h2 className="fw-bold mb-2" 
                    style={{ 
                      color: "#1f2937", 
                      fontSize: "2rem",
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "-0.5px"
                    }}>
                  Join PrepPal
                </h2>
                <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                  Start your journey as an admin today
                </p>
              </div>

              {/* Error Alert with Different Style */}
              {error && (
                <div className="alert border-0 d-flex align-items-start mb-4"
                     style={{ 
                       borderRadius: "16px", 
                       backgroundColor: "#fef2f2", 
                       color: "#991b1b", 
                       border: "2px solid #fee2e2",
                       padding: "16px 20px"
                     }}>
                  <div className="d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                       style={{ 
                         width: "32px", 
                         height: "32px",
                         backgroundColor: "#EF3349",
                         borderRadius: "50%"
                       }}>
                    <span style={{ color: "white", fontSize: "1rem", fontWeight: "bold" }}>!</span>
                  </div>
                  <span style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>{error}</span>
                </div>
              )}

              {/* Form with Card-Style Inputs */}
              <form onSubmit={handleSignup}>
                {/* Username Input Card */}
                <div className="mb-3">
                  <label className="form-label fw-semibold mb-2" 
                         style={{ color: "#4b5563", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Username
                  </label>
                  <div className="card border-0" 
                       style={{ 
                         borderRadius: "16px", 
                         backgroundColor: "#f9fafb",
                         boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                         transition: "all 0.3s"
                       }}
                       onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(43, 203, 154, 0.15)"}
                       onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"}>
                    <div className="card-body p-0">
                      <div className="d-flex align-items-center px-4 py-3">
                        <FaUser color="#2BCB9A" size={18} className="me-3 flex-shrink-0" />
                        <input
                          type="text"
                          className="form-control border-0 p-0"
                          placeholder="John Doe"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          style={{ 
                            fontSize: "15px", 
                            backgroundColor: "transparent",
                            fontFamily: "'Inter', sans-serif",
                            outline: "none",
                            boxShadow: "none"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Input Card */}
                <div className="mb-3">
                  <label className="form-label fw-semibold mb-2" 
                         style={{ color: "#4b5563", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Email Address
                  </label>
                  <div className="card border-0" 
                       style={{ 
                         borderRadius: "16px", 
                         backgroundColor: "#f9fafb",
                         boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                         transition: "all 0.3s"
                       }}
                       onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(43, 203, 154, 0.15)"}
                       onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"}>
                    <div className="card-body p-0">
                      <div className="d-flex align-items-center px-4 py-3">
                        <FaEnvelope color="#2BCB9A" size={18} className="me-3 flex-shrink-0" />
                        <input
                          type="email"
                          className="form-control border-0 p-0"
                          placeholder="admin@preppal.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{ 
                            fontSize: "15px", 
                            backgroundColor: "transparent",
                            fontFamily: "'Inter', sans-serif",
                            outline: "none",
                            boxShadow: "none"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Input Card */}
                <div className="mb-3">
                  <label className="form-label fw-semibold mb-2" 
                         style={{ color: "#4b5563", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Password
                  </label>
                  <div className="card border-0" 
                       style={{ 
                         borderRadius: "16px", 
                         backgroundColor: "#f9fafb",
                         boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                         transition: "all 0.3s"
                       }}
                       onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(43, 203, 154, 0.15)"}
                       onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"}>
                    <div className="card-body p-0">
                      <div className="d-flex align-items-center px-4 py-3">
                        <FaLock color="#2BCB9A" size={18} className="me-3 flex-shrink-0" />
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control border-0 p-0 flex-grow-1"
                          placeholder="Create a strong password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          style={{ 
                            fontSize: "15px", 
                            backgroundColor: "transparent",
                            fontFamily: "'Inter', sans-serif",
                            outline: "none",
                            boxShadow: "none"
                          }}
                        />
                        <div
                          style={{ cursor: "pointer", transition: "all 0.2s" }}
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                          {showPassword ? <FaEyeSlash color="#2BCB9A" size={18} /> : <FaEye color="#2BCB9A" size={18} />}
                        </div>
                      </div>
                    </div>
                  </div>
                  <small className="text-muted mt-2 d-block" style={{ fontSize: "0.78rem", lineHeight: "1.4" }}>
                    8-12 characters • 1 uppercase • 1 number • 1 special character
                  </small>
                </div>

                {/* Signup Button with Red Color */}
                <button
                  type="submit"
                  className="btn w-100 text-white fw-bold py-3 mb-3 border-0 position-relative overflow-hidden mt-4"
                  style={{
                    background: "#2BCB9A ",
                    borderRadius: "16px",
                    fontSize: "16px",
                    transition: "all 0.3s",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.5px"
                  }}
                  
                >
                  Create Your Account
                </button>
              </form>

              {/* Divider with Different Style */}
              <div className="d-flex align-items-center my-4">
                <div className="flex-grow-1" style={{ height: "2px", background: "linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%)" }}></div>
                <span className="px-3 text-muted small fw-medium" style={{ fontSize: "0.8rem" }}>OR</span>
                <div className="flex-grow-1" style={{ height: "2px", background: "linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%)" }}></div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-muted small">Already have an account? </span>
                <Link to="/admin/login" 
                      className="text-decoration-none fw-semibold"
                      style={{ 
                        color: "#2BCB9A",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                      onMouseLeave={(e) => e.target.style.opacity = "1"}>
                  Sign In →
                </Link>
              </div>
            </div>
          </div>        
                 
        </div>
      </div>

      {/* Mobile Header */}
      <div className="d-lg-none position-absolute top-0 start-0 p-4 d-flex align-items-center" style={{ zIndex: 10 }}>
        <div className="d-flex gap-1">
          <div style={{ 
            width: "12px", 
            height: "12px", 
            background: "#2BCB9A",
            borderRadius: "3px"
          }}></div>
          <div style={{ 
            width: "12px", 
            height: "12px", 
            background: "#EF3349",
            borderRadius: "3px"
          }}></div>
          <div style={{ 
            width: "12px", 
            height: "12px", 
            background: "#FFCF25",
            borderRadius: "3px"
          }}></div>
        </div>
        <span className="ms-3 fw-bold" 
              style={{ 
                color: "#1f2937", 
                fontSize: "1.15rem",
                fontFamily: "'Inter', sans-serif"
              }}>
          PrepPal Admin
        </span>
      </div>
    </div>
  );
}

export default Signup;