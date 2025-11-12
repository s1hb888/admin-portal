import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/basic-questions";

export default function BasicQuestionsCrud() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch data
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await axios.get(API_URL);
    setQuestions(res.data);
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ question: "", answer: "" });
    setShowModal(false);
    fetchQuestions();
  };

  // ✅ Handle delete with confirmation
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchQuestions();
    }
  };

  // ✅ Handle edit
  const handleEdit = (q) => {
    setForm({ question: q.question, answer: q.answer });
    setEditingId(q._id);
    setShowModal(true);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "#2BCB9A" }}>Manage Basic Questions</h2>

      {/* Add New Button */}
      <button
        onClick={() => {
          setForm({ question: "", answer: "" });
          setEditingId(null);
          setShowModal(true);
        }}
        style={{
          padding: "8px 14px",
          background: "#2BCB9A",
          color: "#fff",
          border: "none",
          marginBottom: "1rem",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        + Add New Question
      </button>

      {/* Table */}
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead style={{ background: "#e1f8f2" }}>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q._id}>
              <td>{q.question}</td>
              <td>{q.answer}</td>
              <td style={{ textAlign: "center" }}>
                <FaEdit
                  style={{
                    cursor: "pointer",
                    marginRight: "15px",
                    color: "#2BCB9A",
                  }}
                  onClick={() => handleEdit(q)}
                />
                <FaTrash
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDelete(q._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup for Add/Edit */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              width: "400px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>
              {editingId ? "Edit Question" : "Add Question"}
            </h3>
            <form onSubmit={handleSubmit}>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                Question:
              </label>
              <input
                type="text"
                placeholder="Enter Question"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "15px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />

              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
                Answer:
              </label>
              <input
                type="text"
                placeholder="Enter Answer"
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "15px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />

              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    marginRight: "10px",
                    padding: "6px 12px",
                    border: "none",
                    background: "#ccc",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "6px 12px",
                    background: "#2BCB9A",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
