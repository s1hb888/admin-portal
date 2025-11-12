import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

export default function DuaCrud() {
  const [duas, setDuas] = useState([]);
  const [formData, setFormData] = useState({
    dua_name: "",
    image_url: "",
    sound_dua: "",
    dua: "",
    sound_translation: "",
    translation: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchDuas();
  }, []);

  const fetchDuas = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/duas`);
      setDuas(res.data);
    } catch (err) {
      console.error("Failed to fetch duas", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/duas/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE_URL}/api/duas`, formData);
      }
      setFormData({
        dua_name: "",
        image_url: "",
        sound_dua: "",
        dua: "",
        sound_translation: "",
        translation: "",
      });
      setShowForm(false);
      fetchDuas();
    } catch (err) {
      console.error("Error saving dua:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dua?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/duas/${id}`);
      fetchDuas();
    } catch (err) {
      console.error("Error deleting dua:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Add Button */}
      <button
        onClick={() => setShowForm(true)}
        style={{
          background: "#2BCB9A",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <FaPlus /> Add Dua
      </button>

      {/* Modal Form */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              position: "relative",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            {/* Cross Button */}
            <FaTimes
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                  dua_name: "",
                  image_url: "",
                  sound_dua: "",
                  dua: "",
                  sound_translation: "",
                  translation: "",
                });
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: "#555",
                fontSize: "18px",
              }}
            />

            <h3 style={{ marginBottom: "15px" }}>
              {editingId ? "Update Dua" : "Add Dua"}
            </h3>

            <form onSubmit={handleSubmit}>
              <label>Dua Name:</label>
              <input
                type="text"
                value={formData.dua_name}
                onChange={(e) => setFormData({ ...formData, dua_name: e.target.value })}
                required
                style={{ display: "block", margin: "8px 0", padding: "8px", width: "100%" }}
              />

              <label>Image URL:</label>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
                style={{ display: "block", margin: "8px 0", padding: "8px", width: "100%" }}
              />

              <label>Sound Dua URL:</label>
              <input
                type="text"
                value={formData.sound_dua}
                onChange={(e) => setFormData({ ...formData, sound_dua: e.target.value })}
                required
                style={{ display: "block", margin: "8px 0", padding: "8px", width: "100%" }}
              />

              <label>Dua (Arabic):</label>
              <textarea
                value={formData.dua}
                onChange={(e) => setFormData({ ...formData, dua: e.target.value })}
                required
                style={{ display: "block", margin: "8px 0", padding: "8px", width: "100%" }}
              />

              <label>Sound Translation URL:</label>
              <input
                type="text"
                value={formData.sound_translation}
                onChange={(e) => setFormData({ ...formData, sound_translation: e.target.value })}
                required
                style={{ display: "block", margin: "8px 0", padding: "8px", width: "100%" }}
              />

              <label>Translation:</label>
              <textarea
                value={formData.translation}
                onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
                required
                style={{ display: "block", margin: "8px 0", padding: "8px", width: "100%" }}
              />

              <button
                type="submit"
                style={{
                  background: "#2BCB9A",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                {editingId ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Dua List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
        }}
      >
        {duas.map((item) => (
          <li
            key={item._id}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              background: "#e1f8f2",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div>
              <img
                src={item.image_url}
                alt={item.dua_name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "contain",
                  borderRadius: "5px",
                }}
              />
              <div>
                <strong>{item.dua_name}</strong>
                <p style={{ fontSize: "14px", margin: "5px 0" }}>{item.dua}</p>
                <p style={{ fontSize: "13px", color: "#555" }}>
                  {item.translation}
                </p>
              </div>
            </div>

            {/* Action Icons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <FaEdit
                style={{ cursor: "pointer", color: "#FFCF25" }}
                onClick={() => handleEdit(item)}
              />
              <FaTrash
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
