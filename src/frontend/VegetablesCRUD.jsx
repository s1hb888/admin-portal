import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./config";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

export default function VegetablesCRUD() {
  const [vegetables, setVegetables] = useState([]);
  const [formData, setFormData] = useState({
    word: "",
    image_url: "",
    sound_text: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchVegetables();
  }, []);

  const fetchVegetables = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/vegetables`);
      setVegetables(res.data);
    } catch (err) {
      console.error("Failed to fetch vegetables", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const confirmUpdate = window.confirm("Are you sure you want to update this vegetable?");
        if (!confirmUpdate) return;

        await axios.put(`${API_BASE_URL}/api/vegetables/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE_URL}/api/vegetables`, formData);
      }

      setFormData({word: "", image_url: "", sound_text: "" });
      setShowForm(false);
      fetchVegetables();
    } catch (err) {
      console.error("Error saving vegetable:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vegetable?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/vegetables/${id}`);
      fetchVegetables();
    } catch (err) {
      console.error("Error deleting vegetable:", err);
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
        <FaPlus /> Add Vegetable
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
                setFormData({word: "",  image_url: "", sound_text: "" });
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
              {editingId ? "Update Vegetable" : "Add Vegetable"}
            </h3>

            <form onSubmit={handleSubmit}>
              
              <input
                type="text"
                placeholder="Word"
                value={formData.word}
                onChange={(e) =>
                  setFormData({ ...formData, word: e.target.value })
                }
                required
                style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                required
                style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
              />
              <input
                type="text"
                placeholder="Sound Text"
                value={formData.sound_text}
                onChange={(e) =>
                  setFormData({ ...formData, sound_text: e.target.value })
                }
                required
                style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
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
                }}
              >
                {editingId ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Simple List */}
     {/* Simple List */}
<ul
  style={{
    listStyle: "none",
    padding: 0,
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // 2 columns
    gap: "15px",
  }}
>
  {vegetables.map((item) => (
    <li
      key={item._id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        background: "#e1f8f2",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      {/* Left Info */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img
          src={item.image_url}
          alt={item.word}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "contain",
            borderRadius: "5px",
          }}
        />
        <div>
          <strong>{item.alphabet}</strong> - {item.word}{" "}
          <span style={{ color: "#777" }}>({item.sound_text})</span>
        </div>
      </div>

      {/* Action Icons */}
      <div style={{ display: "flex", gap: "12px" }}>
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
