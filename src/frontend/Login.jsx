import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import { GiBabyFace } from "react-icons/gi";
import { API_BASE_URL } from "./config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setError("You must accept the Terms and Conditions.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8–12 characters, include at least 1 uppercase, 1 number, and 1 special character."
      );
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/admins/login`, {
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("adminToken", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-vh-100 d-flex position-relative" style={{ background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)" }}>
      {/* Animated Background Blobs */}
      <div className="position-absolute" 
           style={{ 
             top: "10%", 
             right: "5%", 
             width: "300px", 
             height: "300px",
             background: "radial-gradient(circle, rgba(239, 51, 73, 0.15) 0%, transparent 70%)",
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
             background: "radial-gradient(circle, rgba(43, 203, 154, 0.15) 0%, transparent 70%)",
             borderRadius: "50%",
             filter: "blur(60px)",
             animation: "float 8s ease-in-out infinite reverse"
           }}></div>
      <div className="position-absolute" 
           style={{ 
             top: "50%", 
             left: "50%", 
             width: "200px", 
             height: "200px",
             background: "radial-gradient(circle, rgba(255, 207, 37, 0.1) 0%, transparent 70%)",
             borderRadius: "50%",
             filter: "blur(50px)",
             animation: "float 7s ease-in-out infinite"
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
      `}</style>

      {/* Left Section - Branding */}
      <div className="d-none d-lg-flex col-lg-6 align-items-center justify-content-center p-5 position-relative">
        <div className="text-center fade-in" style={{ maxWidth: "600px", zIndex: 1 }}>
          {/* Logo with matching dashboard colors */}
          <div className="mb-4">
            <div className="d-inline-flex align-items-center justify-content-center mb-3"
                 style={{ 
                   width: "110px", 
                   height: "110px", 
                   background: "linear-gradient(135deg, #2BCB9A 0%, #1fa57a 100%)",
                   borderRadius: "28px",
                   boxShadow: "0 15px 40px rgba(43, 203, 154, 0.35), 0 5px 15px rgba(43, 203, 154, 0.2)",
                   position: "relative",
                   transform: "rotate(-5deg)",
                   transition: "transform 0.3s ease"
                 }}
                 onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(0deg) scale(1.05)"}
                 onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(-5deg) scale(1)"}>
              <div style={{
                position: "absolute",
                width: "70px",
                height: "70px",
                background: "rgba(255,255,255,0.25)",
                borderRadius: "16px",
                transform: "rotate(45deg)"
              }}></div>
              <FaShieldAlt size={48} color="white" style={{ position: "relative", zIndex: 1 }} />
            </div>
          </div>

          {/* Title matching dashboard style */}
          <h1 className="mb-3" 
              style={{ 
                color: "#1f2937", 
                fontSize: "3rem",
                fontWeight: "700",
                letterSpacing: "-1px",
                fontFamily: "'Inter', sans-serif"
              }}>
            PrepPal Admin
          </h1>
          <p className="lead mb-5" style={{ color: "#6b7280", fontSize: "1.15rem", lineHeight: "1.6" }}>
            Empowering educators with cutting-edge tools to create <br/>
            <span style={{ color: "#2BCB9A", fontWeight: "600" }}>exceptional learning experiences</span> for every child
          </p>

          {/* Image with modern design */}
          <div className="position-relative" style={{ marginTop: "3rem" }}>
            <div className="position-relative" style={{ 
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.15)",
              transform: "perspective(1000px) rotateY(-5deg)",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) scale(1.02)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "perspective(1000px) rotateY(-5deg) scale(1)"}>
              <img 
                src="https://media.istockphoto.com/id/186560737/photo/elementary-school-children-writing-in-class.jpg?s=612x612&w=0&k=20&c=m5tH_wbdHi288G4xiZnLjtNPO6arNZ9Z5bvlwCIoCCg="
                alt="Students learning"
                className="img-fluid"
                style={{
                  width: "100%",
                  maxWidth: "550px",
                  display: "block",
                  objectFit: "cover",
                  height: "360px"
                }}
              />
              {/* Gradient Overlay */}
              <div className="position-absolute bottom-0 start-0 end-0 p-4"
                   style={{
                     background: "linear-gradient(to top, rgba(31, 41, 55, 0.95) 0%, rgba(31, 41, 55, 0.7) 50%, transparent 100%)",
                     backdropFilter: "blur(2px)"
                   }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="mb-1 text-white fw-bold" style={{ fontSize: "1.1rem" }}>
                      Manage Content That Inspires
                    </p>

                  </div>
                  <div className="d-flex gap-2">
                    <div style={{ 
                      width: "8px", 
                      height: "8px", 
                      borderRadius: "50%", 
                      backgroundColor: "#EF3349" 
                    }}></div>
                    <div style={{ 
                      width: "8px", 
                      height: "8px", 
                      borderRadius: "50%", 
                      backgroundColor: "#2BCB9A" 
                    }}></div>
                    <div style={{ 
                      width: "8px", 
                      height: "8px", 
                      borderRadius: "50%", 
                      backgroundColor: "#FFCF25" 
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
        <div className="card border-0 fade-in" 
             style={{ 
               width: "100%", 
               maxWidth: "520px", 
               borderRadius: "24px", 
               background: "white",
               boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 8px 30px rgba(0,0,0,0.08)"
             }}>
          <div className="card-body p-5">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center mb-3"
                   style={{ 
                     width: "70px", 
                     height: "70px", 
                     background: "linear-gradient(135deg, #EF3349 0%, #c91d32 100%)",
                     borderRadius: "18px",
                     boxShadow: "0 10px 25px rgba(239, 51, 73, 0.3)"
                   }}>
                <FaShieldAlt size={32} color="white" />
              </div>
              <h2 className="fw-bold mb-2" 
                  style={{ 
                    color: "#1f2937", 
                    fontSize: "1.85rem",
                    fontFamily: "'Inter', sans-serif"
                  }}>
                Admin Portal
              </h2>
              <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                Secure access to your management dashboard
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="alert border-0 d-flex align-items-center mb-4"
                   style={{ 
                     borderRadius: "14px", 
                     backgroundColor: "#fef2f2", 
                     color: "#991b1b", 
                     borderLeft: "4px solid #EF3349",
                     padding: "14px 18px"
                   }}>
                <span className="me-2" style={{ fontSize: "1.2rem" }}>⚠️</span>
                <span style={{ fontSize: "0.9rem" }}>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="mb-3">
                <label className="form-label fw-semibold mb-2" 
                       style={{ color: "#4b5563", fontSize: "0.9rem" }}>
                  Email Address
                </label>
                <div className="input-group" 
                     style={{ 
                       borderRadius: "14px", 
                       overflow: "hidden", 
                       border: "2px solid #e5e7eb",
                       transition: "all 0.3s"
                     }}
                     onFocus={(e) => e.currentTarget.style.borderColor = "#2BCB9A"}
                     onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}>
                  <span className="input-group-text border-0" 
                        style={{ backgroundColor: "#f9fafb", paddingLeft: "18px" }}>
                    <FaEnvelope color="#2BCB9A" size={18} />
                  </span>
                  <input
                    type="email"
                    className="form-control border-0 py-3"
                    placeholder="admin@preppal.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ 
                      fontSize: "15px", 
                      backgroundColor: "#f9fafb", 
                      paddingRight: "18px",
                      fontFamily: "'Inter', sans-serif"
                    }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <label className="form-label fw-semibold mb-2" 
                       style={{ color: "#4b5563", fontSize: "0.9rem" }}>
                  Password
                </label>
                <div className="input-group" 
                     style={{ 
                       borderRadius: "14px", 
                       overflow: "hidden", 
                       border: "2px solid #e5e7eb",
                       transition: "all 0.3s"
                     }}
                     onFocus={(e) => e.currentTarget.style.borderColor = "#2BCB9A"}
                     onBlur={(e) => e.currentTarget.style.borderColor = "#e5e7eb"}>
                  <span className="input-group-text border-0" 
                        style={{ backgroundColor: "#f9fafb", paddingLeft: "18px" }}>
                    <FaLock color="#2BCB9A" size={18} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control border-0 py-3"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ 
                      fontSize: "15px", 
                      backgroundColor: "#f9fafb",
                      fontFamily: "'Inter', sans-serif"
                    }}
                  />
                  <span
                    className="input-group-text border-0"
                    style={{ 
                      cursor: "pointer", 
                      backgroundColor: "#f9fafb", 
                      paddingRight: "18px",
                      transition: "all 0.2s"
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                    {showPassword ? <FaEyeSlash color="#2BCB9A" size={18} /> : <FaEye color="#2BCB9A" size={18} />}
                  </span>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="d-flex justify-content-end mb-4">
                <Link to="/forgot-password" 
                      className="text-decoration-none small fw-semibold"
                      style={{ 
                        color: "#EF3349",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                      onMouseLeave={(e) => e.target.style.opacity = "1"}>
                  Forgot Password?
                </Link>
              </div>

              {/* Terms Checkbox */}
              <div className="mb-4">
                <label className="d-flex align-items-start" style={{ cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    style={{ display: "none" }}
                    id="terms"
                  />
                  <div
                    className="d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                    style={{
                      width: "22px",
                      height: "22px",
                      border: `2.5px solid ${termsAccepted ? '#2BCB9A' : '#d1d5db'}`,
                      borderRadius: "6px",
                      backgroundColor: termsAccepted ? '#2BCB9A' : 'white',
                      transition: "all 0.3s",
                      boxShadow: termsAccepted ? "0 2px 8px rgba(43, 203, 154, 0.3)" : "none"
                    }}
                  >
                    {termsAccepted && <span style={{ color: "white", fontSize: "13px", fontWeight: "bold" }}>✓</span>}
                  </div>
                  <span className="small" style={{ color: "#4b5563", lineHeight: "1.6" }}>
                    I accept the{" "}
                    <Link to="/terms" className="text-decoration-none fw-semibold" 
                          style={{ color: "#2BCB9A" }}>
                      Terms & Conditions
                    </Link>
                  </span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn w-100 text-white fw-bold py-3 mb-3 border-0 position-relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #EF3349 0%, #c91d32 100%)",
                  borderRadius: "14px",
                  fontSize: "16px",
                  transition: "all 0.3s",
                  boxShadow: "0 6px 16px rgba(239, 51, 73, 0.25)",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.3px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 10px 24px rgba(239, 51, 73, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 6px 16px rgba(239, 51, 73, 0.25)";
                }}
              >
                Sign In to Dashboard
              </button>
            </form>

            {/* Divider */}
            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1" style={{ borderColor: "#e5e7eb", opacity: 1 }} />
              <span className="px-3 text-muted small fw-medium">OR</span>
              <hr className="flex-grow-1" style={{ borderColor: "#e5e7eb", opacity: 1 }} />
            </div>

            {/* Sign Up Link */}
            <p className="text-center mb-0">
              <span className="text-muted small">Don't have an account? </span>
              <Link to="/admin/signup" 
                    className="text-decoration-none fw-semibold"
                    style={{ 
                      color: "#2BCB9A",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}>
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="d-lg-none position-absolute top-0 start-0 p-4 d-flex align-items-center" style={{ zIndex: 10 }}>
        <div className="d-flex align-items-center justify-content-center"
             style={{ 
               width: "52px", 
               height: "52px", 
               background: "linear-gradient(135deg, #2BCB9A 0%, #1fa57a 100%)",
               borderRadius: "14px",
               boxShadow: "0 6px 16px rgba(43, 203, 154, 0.35)"
             }}>
          <FaShieldAlt size={26} color="white" />
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

export default Login;