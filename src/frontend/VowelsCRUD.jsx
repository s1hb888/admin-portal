import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

export default function VowelsCRUD() {
  const [vowels, setVowels] = useState([]);
  const [formData, setFormData] = useState({
    image_url: "",
    sound_text: "",
    alphabet: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchVowels();
  }, []);

  const fetchVowels = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/vowels`);
      setVowels(res.data);
    } catch (err) {
      console.error("Failed to fetch vowels", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const confirmUpdate = window.confirm("Are you sure you want to update this vowel?");
        if (!confirmUpdate) return;

        await axios.put(`${API_BASE_URL}/api/vowels/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE_URL}/api/vowels`, formData);
      }

      setFormData({ image_url: "", sound_text: "", alphabet: "" });
      setShowForm(false);
      fetchVowels();
    } catch (err) {
      console.error("Error saving vowel:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vowel?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/vowels/${id}`);
      fetchVowels();
    } catch (err) {
      console.error("Error deleting vowel:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
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
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <FaPlus /> Add Vowel
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
              padding: "25px",
              borderRadius: "10px",
              width: "420px",
              position: "relative",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            {/* Close Button */}
            <FaTimes
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({ image_url: "", sound_text: "", alphabet: "" });
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: "#EF3349",
                fontSize: "20px",
              }}
            />

            <h3 style={{ marginBottom: "15px", textAlign: "center", color: "#333" }}>
              {editingId ? "Update Vowel" : "Add Vowel"}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              
              {/* Alphabet Label */}
              <label style={{ fontWeight: "500", color: "#333" }}>Alphabet:</label>
              <input
                type="text"
                placeholder="Enter Alphabet"
                value={formData.alphabet}
                onChange={(e) => setFormData({ ...formData, alphabet: e.target.value })}
                required
                style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
              />

              {/* Image URL Label */}
              <label style={{ fontWeight: "500", color: "#333" }}>Image URL:</label>
              <input
                type="text"
                placeholder="Enter Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
                style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
              />

              {/* Sound Text Label */}
              <label style={{ fontWeight: "500", color: "#333" }}>Sound Text:</label>
              <input
                type="text"
                placeholder="Enter Sound Text"
                value={formData.sound_text}
                onChange={(e) => setFormData({ ...formData, sound_text: e.target.value })}
                required
                style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
              />

              <button
                type="submit"
                style={{
                  background: "#FFCF25",
                  color: "#222",
                  border: "none",
                  padding: "10px",
                  borderRadius: "6px",
                  fontWeight: "500",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                {editingId ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Vowel List */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
        }}
      >
        {vowels.map((item) => (
          <li
            key={item._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              background: "#f7fffc",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img
                src={item.image_url}
                alt={item.alphabet}
                style={{ width: "50px", height: "50px", objectFit: "contain", borderRadius: "6px" }}
              />
              <div>
                <strong style={{ fontSize: "18px" }}>{item.alphabet}</strong>
                <div style={{ color: "#666", fontSize: "14px" }}>{item.sound_text}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <FaEdit
                style={{ cursor: "pointer", color: "#FFCF25" }}
                onClick={() => handleEdit(item)}
              />
              <FaTrash
                style={{ cursor: "pointer", color: "#EF3349" }}
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
