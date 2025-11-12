import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

export default function UrduCRUD() {
  const [urduAlphabets, setUrduAlphabets] = useState([]);
  const [formData, setFormData] = useState({
    alphabet: "",
    image_url: "",
    word: "",
    sound_text: "",
    min_attempts: 3,
    min_time_avg: 10,
    min_correct_avg: 80,
  });
  const [editingId, setEditingId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchUrduAlphabets();
  }, []);

  const fetchUrduAlphabets = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/urdu_alphabets`);
      setUrduAlphabets(res.data);
    } catch (err) {
      console.error("Failed to fetch Urdu alphabets", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/urdu_alphabets/${editingId}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/urdu_alphabets`, formData);
      }

      setFormData({
        alphabet: "",
        image_url: "",
        word: "",
        sound_text: "",
        min_attempts: 3,
        min_time_avg: 10,
        min_correct_avg: 80,
      });

      setEditingId(null);
      setShowPopup(false);
      fetchUrduAlphabets();
    } catch (err) {
      console.error("Error saving Urdu alphabet:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      alphabet: item.alphabet,
      image_url: item.image_url,
      word: item.word,
      sound_text: item.sound_text,
      min_attempts: item.min_attempts,
      min_time_avg: item.min_time_avg,
      min_correct_avg: item.min_correct_avg,
    });
    setEditingId(item._id);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Urdu alphabet?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/urdu_alphabets/${id}`);
      fetchUrduAlphabets();
    } catch (err) {
      console.error("Error deleting Urdu alphabet:", err);
    }
  };

  const openPopup = () => {
    setEditingId(null);
    setFormData({
      alphabet: "",
      image_url: "",
      word: "",
      sound_text: "",
      min_attempts: 3,
      min_time_avg: 10,
      min_correct_avg: 80,
    });
    setShowPopup(true);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
      {/* Add Button */}
      <button
        onClick={openPopup}
        style={{
          background: "#2BCB9A",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 18px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <FaPlus /> Add Urdu Alphabet
      </button>

      {/* Popup Form */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "10px",
              width: "500px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ marginBottom: "15px", color: "#333", textAlign: "center" }}>
              {editingId ? "Update Urdu Alphabet" : "Add Urdu Alphabet"}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label>
                <span style={{ fontWeight: "500", color: "#333" }}>Alphabet:</span>
                <input
                  type="text"
                  value={formData.alphabet}
                  onChange={(e) => setFormData({ ...formData, alphabet: e.target.value })}
                  required
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>

              <label>
                <span style={{ fontWeight: "500", color: "#333" }}>Image URL:</span>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  required
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>

              <label>
                <span style={{ fontWeight: "500", color: "#333" }}>Word:</span>
                <input
                  type="text"
                  value={formData.word}
                  onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                  required
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>

              <label>
                <span style={{ fontWeight: "500", color: "#333" }}>Sound Text:</span>
                <input
                  type="text"
                  value={formData.sound_text}
                  onChange={(e) => setFormData({ ...formData, sound_text: e.target.value })}
                  required
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>

              <label>
                <span style={{ fontWeight: "500", color: "#333" }}>Minimum Attempts:</span>
                <input
                  type="number"
                  min = "1"
                  value={formData.min_attempts}
                  onChange={(e) => setFormData({ ...formData, min_attempts: Number(e.target.value) })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>

              <label>
                <span style={{ fontWeight: "500", color: "#333" }}>Minimum Time Average:</span>
                <input
                  type="number"
                  step="1"
                   min="1" 
                  value={formData.min_time_avg}
                  onChange={(e) => setFormData({ ...formData, min_time_avg: Number(e.target.value) })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>

              <label>
                <span style={{ fontWeight: "500", color: "#333" }}>Minimum Correct Percentage:</span>
                <input
                  type="number"
                   min="1" 
                  value={formData.min_correct_avg}
                  onChange={(e) => setFormData({ ...formData, min_correct_avg: Number(e.target.value) })}
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "6px" }}
                />
              </label>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  type="submit"
                  style={{
                    background: "#FFCF25",
                    color: "#222",
                    border: "none",
                    borderRadius: "6px",
                    padding: "10px 16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {editingId ? "Update" : "Add"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  style={{
                    background: "#EF3349",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "10px 16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#2BCB9A", color: "white", textAlign: "left" }}>
            <th style={{ padding: "12px" }}>Alphabet</th>
            <th>Word</th>
            <th>Image</th>
            <th>Sound Text</th>
            <th>Attempts</th>
            <th>Time Avg</th>
            <th>Correct %</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urduAlphabets.map((item) => (
            <tr key={item._id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{item.alphabet}</td>
              <td>{item.word}</td>
              <td>
                <img src={item.image_url} alt={item.word} style={{ width: "50px", borderRadius: "6px" }} />
              </td>
              <td>{item.sound_text}</td>
              <td>{item.min_attempts}</td>
              <td>{item.min_time_avg}</td>
              <td>{item.min_correct_avg}</td>
              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => handleEdit(item)}
                  style={{
                    color: "#FFCF25",
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  style={{
                    color: "#EF3349",
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
