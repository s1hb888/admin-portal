import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_BASE_URL } from './config';

function Profile() {
  const [profile, setProfile] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

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
      setUsername(res.data.username);
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
      alert("Image uploaded");
      setProfile((prev) => ({ ...prev, profileImage: res.data.imageUrl }));
    } catch (err) {
      alert("Image upload failed");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete your account?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`${API_BASE_URL}/api/profile/delete`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem("adminToken");
        window.location.href = "/signup";
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3>Profile Management</h3>

      <div className="mb-3">
        <label>Profile Picture</label>
        <div>
          {profile.profileImage && (
            <img
              src={`${API_BASE_URL}${profile.profileImage}`}
              alt="profile"
              width="100"
              style={{ borderRadius: "50%" }}
            />
          )}
        </div>
        <input type="file" onChange={handleImageUpload} />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input className="form-control" value={profile.email || ""} disabled />
      </div>

      <div className="mb-3">
        <label>Username</label>
        <input
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>New Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-success me-2" onClick={handleUpdate}>
        Save Changes
      </button>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete Account
      </button>
    </div>
  );
}

export default Profile;
