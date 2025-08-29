import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";

function Profile() {
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%", borderRadius: "20px", backgroundColor: "#fff", border: "3px solid #2BCB9A" }}>
        <div className="text-center mb-4">
          {previewImage ? (
            <img
              src={previewImage}
              alt="profile"
              className="mb-2"
              style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "4px solid #FFCF25" }}
            />
          ) : (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#e1f8f2",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
                fontWeight: "bold",
                color: "#2BCB9A",
                margin: "0 auto 10px",
                border: "4px solid #FFCF25",
              }}
            >
              {profile.username ? profile.username[0].toUpperCase() : "?"}
            </div>
          )}

          <input type="file" onChange={handleImageUpload} className="form-control mt-2 mb-2" />

          {previewImage && (
            <button className="btn btn-danger btn-sm" onClick={handleDeleteImage}>
              Delete Image
            </button>
          )}
        </div>

        <h4 className="text-center mb-4" style={{ color: "#2BCB9A" }}>
          Profile Management
        </h4>

        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" value={profile.email || ""} disabled />
        </div>

        <div className="mb-3">
          <label>Username</label>
          <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>New Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="d-flex justify-content-between">
          <button className="btn" style={{ backgroundColor: "#2BCB9A", color: "#fff" }} onClick={handleUpdate}>
            Save Changes
          </button>
          <button className="btn" style={{ backgroundColor: "#EF3349", color: "#fff" }} onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
