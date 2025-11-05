import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/shapequiz";

// 🎨 Theme Colors
const red = "#EF3349";
const green = "#2BCB9A";
const yellow = "#FFCF25";
const textDark = "#222";
const textMuted = "#6c757d";

const ShapeQuizAdmin = () => {
  const [quizData, setQuizData] = useState([]);
  const [quizTitle, setQuizTitle] = useState("Shapes");
  const [shapeName, setShapeName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [hints, setHints] = useState(["", ""]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const res = await axios.get(API_URL);
      setQuizData(res.data);
    } catch (err) {
      console.error("Error fetching quiz data:", err);
    }
  };

  const validateFields = () => {
    if (!shapeName.trim()) return "Please enter the shape name.";
    if (!imageUrl.trim()) return "Please enter the image URL.";
    if (hints.some((h) => !h.trim())) return "Please fill in both hints.";
    return null;
  };

  const handleAdd = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    if (!window.confirm("Are you sure you want to add this shape question?")) return;

    try {
      const newQuestion = {
        quiz_title: quizTitle,
        shapeName,
        imageUrl,
        hints: hints.map((text) => ({ text })),
      };
      await axios.post(API_URL, newQuestion);
      alert("✅ Shape question added successfully!");
      fetchQuizData();
      resetForm();
    } catch (err) {
      console.error("Error adding shape question:", err);
      alert("❌ Failed to add question!");
    }
  };

  const handleEdit = async (quizId, questionId) => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    if (!window.confirm("Are you sure you want to update this question?")) return;

    try {
      await axios.put(`${API_URL}/${quizId}/${questionId}`, {
        shapeName,
        imageUrl,
        hints: hints.map((text) => ({ text })),
      });
      alert("✅ Shape question updated successfully!");
      fetchQuizData();
      resetForm();
      setEditing(null);
    } catch (err) {
      console.error("Error updating question:", err);
      alert("❌ Failed to update question!");
    }
  };

  const handleDelete = async (quizId, questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axios.delete(`${API_URL}/${quizId}/${questionId}`);
      alert("✅ Question deleted successfully!");
      fetchQuizData();
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("❌ Failed to delete question!");
    }
  };

  const resetForm = () => {
    setShapeName("");
    setImageUrl("");
    setHints(["", ""]);
    setError("");
    setEditing(null);
  };

  const handleHintChange = (index, value) => {
    const updated = [...hints];
    updated[index] = value;
    setHints(updated);
  };

  return (
    <div
      className="container my-5"
      style={{
        maxWidth: "1100px",
        border: `3px solid ${green}`,
        borderRadius: "15px",
        padding: "30px",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          color: yellow,
          fontWeight: "900",
          fontSize: "2.8rem",
          marginBottom: "40px",
          textAlign: "left",
        }}
      >
        Shape Quiz Management
      </h2>

      {/* 🟡 Input Form */}
      <Card
        className="p-4 shadow-sm mb-5"
        style={{
          borderRadius: "15px",
          border: `2px solid ${green}`,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Form>
          {error && (
            <Alert variant="danger" style={{ fontWeight: "600", fontSize: "1rem" }}>
              {error}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Shape Name (Correct Answer)</Form.Label>
            <Form.Control
              value={shapeName}
              onChange={(e) => setShapeName(e.target.value)}
              placeholder="Enter shape name (e.g., Circle)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "600" }}>Image URL</Form.Label>
            <Form.Control
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL here"
            />
          </Form.Group>

          <h5 style={{ marginBottom: "10px", color: textDark }}>Hints</h5>
          {hints.map((hint, index) => (
            <Form.Group key={index} className="mb-2">
              <Form.Control
                placeholder={`Hint ${index + 1}`}
                value={hint}
                onChange={(e) => handleHintChange(index, e.target.value)}
              />
            </Form.Group>
          ))}

          {editing ? (
            <Button
              onClick={() => handleEdit(editing.quizId, editing.questionId)}
              style={{ backgroundColor: green, color: "#fff", fontWeight: "600" }}
            >
              <FaEdit /> Update
            </Button>
          ) : (
            <Button
              onClick={handleAdd}
              style={{ backgroundColor: green, color: "#fff", fontWeight: "600" }}
            >
              <FaPlus /> Add
            </Button>
          )}
        </Form>
      </Card>

      {/* 🟩 Existing Questions */}
      <div>
        <h4 style={{ color: textDark, marginBottom: "15px" }}>Existing Shape Questions</h4>
        {quizData.length === 0 ? (
          <p style={{ color: textMuted }}>No shape questions yet.</p>
        ) : (
          quizData.map((quiz) =>
            quiz.questions.map((q) => (
              <Card
                key={q._id}
                className="p-3 mb-3 shadow-sm"
                style={{
                  borderRadius: "12px",
                  borderLeft: `6px solid ${yellow}`,
                  backgroundColor: "#fff8e1",
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  {q.imageUrl && (
                    <img
                      src={q.imageUrl}
                      alt={q.shapeName}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                        borderRadius: "10px",
                        border: `2px solid ${green}`,
                      }}
                    />
                  )}
                  <div>
                    <h5 style={{ fontWeight: "700", color: red }}>
                      Shape: {q.shapeName}
                    </h5>
                    <p style={{ marginBottom: 0, color: textDark }}>
                      <strong>Hints:</strong>{" "}
                      {q.hints.map((h, i) => (
                        <span key={i}>
                          {h.text}
                          {i < q.hints.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <Button
                    variant="warning"
                    onClick={() => {
                      setShapeName(q.shapeName);
                      setImageUrl(q.imageUrl);
                      setHints(q.hints.map((h) => h.text));
                      setEditing({ quizId: quiz._id, questionId: q._id });
                    }}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(quiz._id, q._id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </div>
              </Card>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default ShapeQuizAdmin;
