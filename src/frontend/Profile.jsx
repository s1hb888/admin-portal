import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaTrash, FaSave, FaUserCircle, FaShieldAlt, FaCog, FaUserEdit } from "react-icons/fa";

function Profile() {
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const green = "#2BCB9A";
  const red = "#EF3349";
  const yellow = "#FFCF25";
  const textDark = "#222";
  const textMuted = "#6c757d";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API_BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setUsername(res.data.username || "");
      setPreviewImage(
        res.data.profileImage ? `${API_BASE_URL}${res.data.profileImage}` : null
      );
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_BASE_URL}/api/profile/update`,
        { username, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated");
      fetchProfile();
      setPassword("");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.put(`${API_BASE_URL}/api/profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile((prev) => ({ ...prev, profileImage: res.data.imageUrl }));
      setPreviewImage(`${API_BASE_URL}${res.data.imageUrl}`);
      alert("Image uploaded");
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed");
    }
  };

  const handleDeleteImage = async () => {
    if (!window.confirm("Are you sure you want to delete your profile image?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_BASE_URL}/api/profile/photo`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPreviewImage(null);
      setProfile((prev) => ({ ...prev, profileImage: null }));
      alert("Profile image deleted successfully");
    } catch (err) {
      console.error("Delete image failed:", err);
      alert("Failed to delete profile image");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`${API_BASE_URL}/api/profile/delete`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.removeItem("adminToken");
        alert("Account deleted successfully");
        window.location.href = "/signup";
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete account");
      }
    }
  };

  return (
    <div style={{ 
      fontFamily: "'Inter', sans-serif", 
      backgroundColor: '#f3f4f6', 
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>
      <div style={{
        maxWidth: "1100px",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        overflow: "hidden",
        position: "relative"
      }}>
        {/* Decorative Top Gradient */}
        <div style={{
          height: "6px",
          background: `linear-gradient(90deg, ${green}, ${yellow}, ${red})`,
        }} />

        {/* Top Visual Header - Profile Management Banner */}
        <div style={{
          background: `linear-gradient(135deg, ${green}, ${green}DD)`,
          padding: "2rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Decorative background shapes */}
          <div style={{
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            zIndex: 0
          }} />
          <div style={{
            position: "absolute",
            bottom: "-40px",
            left: "20%",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            zIndex: 0
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", zIndex: 1 }}>
            <div style={{
              width: "70px",
              height: "70px",
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${yellow}, ${yellow}DD)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 8px 20px ${yellow}40`
            }}>
              <FaUserEdit size={36} color="#fff" />
            </div>
            <div>
              <h1 style={{ 
                color: "#fff", 
                fontWeight: "700",
                fontSize: "1.8rem",
                marginBottom: "0.25rem",
                textShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}>
                Profile Management
              </h1>
              <p style={{ 
                color: "rgba(255,255,255,0.9)", 
                fontSize: "1rem",
                margin: 0
              }}>
                Update your account information
              </p>
            </div>
          </div>

          <div style={{ 
            display: "flex", 
            gap: "1rem",
            zIndex: 1
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "12px",
              backgroundColor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.3)"
            }}>
              <FaCog color="#fff" size={18} />
              <span style={{ color: "#fff", fontWeight: "600", fontSize: "0.9rem" }}>
                Settings
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{
          display: "flex",
          gap: "3rem",
          padding: "3rem",
          alignItems: "flex-start"
        }}>
          {/* Left Side - Profile Image */}
          <div style={{
            flex: "0 0 300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem 1.5rem",
            backgroundColor: `${green}05`,
            borderRadius: "16px",
            border: `2px solid ${green}15`
          }}>
            {/* Profile Image */}
            <div style={{ position: "relative", display: "inline-block", zIndex: 1 }}>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="profile"
                  style={{ 
                    width: "160px", 
                    height: "160px", 
                    borderRadius: "50%", 
                    objectFit: "cover", 
                    border: `5px solid ${yellow}`,
                    boxShadow: `0 10px 30px ${green}40`
                  }}
                />
              ) : (
                <div style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${green}, ${green}DD)`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "60px",
                  fontWeight: "bold",
                  color: "#fff",
                  border: `5px solid ${yellow}`,
                  boxShadow: `0 10px 30px ${green}40`
                }}>
                  {profile.username ? profile.username[0].toUpperCase() : <FaUserCircle size={80} />}
                </div>
              )}

              {/* Camera Icon Overlay */}
              <label htmlFor="imageUpload" style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${yellow}, ${yellow}DD)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: `0 4px 15px ${yellow}60`,
                transition: "all 0.3s ease",
                border: "3px solid #fff"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.15)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <FaCamera color="#fff" size={20} />
              </label>
              <input 
                id="imageUpload"
                type="file" 
                onChange={handleImageUpload} 
                style={{ display: "none" }}
              />
            </div>

            <h3 style={{ 
              color: textDark, 
              fontWeight: "700", 
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
              fontSize: "1.4rem",
              textAlign: "center"
            }}>
              {profile.username || "Admin User"}
            </h3>

            <p style={{
              color: textMuted,
              fontSize: "0.9rem",
              textAlign: "center",
              marginBottom: "1rem",
              wordBreak: "break-word",
              width: "100%",
              padding: "0 1rem"
            }}>
              {profile.email || ""}
            </p>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1.25rem",
              borderRadius: "20px",
              backgroundColor: `${green}20`,
              border: `2px solid ${green}`,
              marginBottom: "1rem"
            }}>
              <FaShieldAlt color={green} size={14} />
              <span style={{ color: green, fontWeight: "600", fontSize: "0.85rem" }}>
                Administrator
              </span>
            </div>

            {/* Delete Image Button */}
            {previewImage && (
              <button 
                onClick={handleDeleteImage}
                style={{
                  padding: "0.65rem 1.5rem",
                  borderRadius: "10px",
                  backgroundColor: hoveredButton === "deleteImg" ? red : "#fff",
                  color: hoveredButton === "deleteImg" ? "#fff" : red,
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: `2px solid ${red}`
                }}
                onMouseEnter={() => setHoveredButton("deleteImg")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <FaTrash size={12} />
                Remove Photo
              </button>
            )}
          </div>

          {/* Right Side - Form Section */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Email Field */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ 
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: textDark,
                fontWeight: "600",
                marginBottom: "0.75rem",
                fontSize: "0.9rem"
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: `${green}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FaEnvelope color={green} size={14} />
                </div>
                Email Address
              </label>
              <input 
                type="email"
                value={profile.email || ""} 
                disabled 
                style={{
                  width: "100%",
                  padding: "0.9rem 1.25rem",
                  borderRadius: "12px",
                  border: "2px solid #e9ecef",
                  fontSize: "0.95rem",
                  backgroundColor: "#f8f9fa",
                  color: textMuted,
                  fontFamily: "'Inter', sans-serif"
                }}
              />
              <small style={{ 
                color: textMuted, 
                fontSize: "0.8rem", 
                marginTop: "0.5rem", 
                display: "block",
                marginLeft: "0.5rem"
              }}>
                Email address cannot be changed
              </small>
            </div>

            {/* Username Field */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ 
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: textDark,
                fontWeight: "600",
                marginBottom: "0.75rem",
                fontSize: "0.9rem"
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: `${green}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FaUser color={green} size={14} />
                </div>
                Username
              </label>
              <input 
                type="text"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.9rem 1.25rem",
                  borderRadius: "12px",
                  border: "2px solid #e9ecef",
                  fontSize: "0.95rem",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = green;
                  e.target.style.boxShadow = `0 0 0 4px ${green}15`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e9ecef";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: "2rem" }}>
              <label style={{ 
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: textDark,
                fontWeight: "600",
                marginBottom: "0.75rem",
                fontSize: "0.9rem"
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  backgroundColor: `${green}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FaLock color={green} size={14} />
                </div>
                New Password
              </label>
              <input 
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                style={{
                  width: "100%",
                  padding: "0.9rem 1.25rem",
                  borderRadius: "12px",
                  border: "2px solid #e9ecef",
                  fontSize: "0.95rem",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = green;
                  e.target.style.boxShadow = `0 0 0 4px ${green}15`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e9ecef";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ 
              display: "flex", 
              gap: "1rem",
              paddingTop: "1.5rem",
              borderTop: `2px solid ${green}15`,
              marginBottom: "1.5rem"
            }}>
              <button 
                onClick={handleUpdate}
                style={{
                  flex: 1,
                  padding: "0.9rem 1.5rem",
                  borderRadius: "12px",
                  border: "none",
                  background: hoveredButton === "save" 
                    ? `linear-gradient(135deg, ${green}DD, ${green})` 
                    : `linear-gradient(135deg, ${green}, ${green}DD)`,
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  boxShadow: hoveredButton === "save" 
                    ? `0 10px 30px ${green}60` 
                    : `0 6px 20px ${green}40`,
                  transform: hoveredButton === "save" ? "translateY(-2px)" : "translateY(0)"
                }}
                onMouseEnter={() => setHoveredButton("save")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <FaSave size={18} />
                Save Changes
              </button>

              <button 
                onClick={handleDeleteAccount}
                style={{
                  flex: 1,
                  padding: "0.9rem 1.5rem",
                  borderRadius: "12px",
                  border: "none",
                  background: hoveredButton === "delete" 
                    ? `linear-gradient(135deg, ${red}DD, ${red})` 
                    : `linear-gradient(135deg, ${red}, ${red}DD)`,
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  boxShadow: hoveredButton === "delete" 
                    ? `0 10px 30px ${red}60` 
                    : `0 6px 20px ${red}40`,
                  transform: hoveredButton === "delete" ? "translateY(-2px)" : "translateY(0)"
                }}
                onMouseEnter={() => setHoveredButton("delete")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <FaTrash size={18} />
                Delete Account
              </button>
            </div>

            {/* Warning Message */}
            <div style={{
              padding: "1.25rem",
              borderRadius: "12px",
              backgroundColor: "#fff3cd",
              border: `2px solid ${yellow}`,
              display: "flex",
              alignItems: "center",
              gap: "1rem"
            }}>
              <div style={{
                minWidth: "36px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: yellow,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.15rem",
                flexShrink: 0
              }}>
                ⚠️
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ 
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "#856404",
                  lineHeight: "1.5",
                  fontWeight: "500"
                }}>
                  <strong style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.9rem" }}>Warning</strong>
                  Deleting your account is permanent and cannot be undone. All your data will be lost forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;