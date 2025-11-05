import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/counting-quiz";

const red = "#EF3349";
const green = "#2BCB9A";
const yellow = "#FFCF25";
const textDark = "#222";
const textMuted = "#6c757d";

const CountingQuizAdmin = () => {
  const [quizData, setQuizData] = useState([]);
  const [quizTitle, setQuizTitle] = useState("Counting Quiz");
  const [question, setQuestion] = useState("");
  const [images, setImages] = useState(["", "", ""]);
  const [answer, setAnswer] = useState("");
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  // ✅ Fetch quiz data
  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const res = await axios.get(API_URL);
      setQuizData(res.data);
    } catch (err) {
      console.error("Error fetching counting quiz:", err);
    }
  };

  // ✅ Handle image change
  const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  // ✅ Validate fields
  const validateFields = () => {
    if (!question.trim()) return "Please enter a question.";
    if (images.some((img) => !img.trim())) return "Please add all 3 image URLs.";
    if (!answer.trim()) return "Please enter the correct answer.";
    return null;
  };

  // ✅ Reset form
  const resetForm = () => {
    setQuestion("");
    setImages(["", "", ""]);
    setAnswer("");
    setEditing(null);
    setError("");
  };

  // ✅ Add question
  const handleAdd = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    if (!window.confirm("Are you sure you want to add this question?")) return;
    try {
      await axios.post(API_URL, { quiz_title: quizTitle, question, images, answer });
      alert("✅ Question added successfully!");
      fetchQuizData();
      resetForm();
    } catch (err) {
      alert("❌ Failed to add question!");
    }
  };

  // ✅ Update question
  const handleUpdate = async () => {
    if (!editing) return;
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    if (!window.confirm("Are you sure you want to update this question?")) return;
    try {
      await axios.put(`${API_URL}/${editing.quizId}/${editing.questionId}`, {
        question,
        images,
        answer,
      });
      alert("✅ Question updated successfully!");
      fetchQuizData();
      resetForm();
    } catch (err) {
      alert("❌ Failed to update question!");
    }
  };

  // ✅ Delete question
  const handleDelete = async (quizId, questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axios.delete(`${API_URL}/${quizId}/${questionId}`);
      alert("🗑 Deleted successfully!");
      fetchQuizData();
    } catch (err) {
      alert("❌ Failed to delete question!");
    }
  };

  // ✅ Edit mode
  const handleEdit = (quizId, q) => {
    setEditing({ quizId, questionId: q._id });
    setQuestion(q.question);
    setImages(q.images);
    setAnswer(q.answer);
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
        Counting Quiz Management
      </h2>

      {/* 🔹 Add/Edit Form */}
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

          {/* Question */}
          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>
              Question
            </Form.Label>
            <Form.Control
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Example: How many apples are there?"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </Form.Group>

          {/* Images */}
          <h5 style={{ marginBottom: "15px", color: textDark }}>Image Options (3)</h5>
          {images.map((img, index) => (
            <div key={index} className="d-flex gap-3 mb-3 align-items-center flex-wrap">
              <Form.Control
                placeholder={`Image URL ${index + 1}`}
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
                style={{ flex: "2", minWidth: "200px", padding: "10px" }}
              />
              {img && (
                <img
                  src={img}
                  alt={`Option ${index + 1}`}
                  width="70"
                  height="70"
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover",
                    border: `2px solid ${yellow}`,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                />
              )}
            </div>
          ))}

          {/* Correct Answer */}
          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>
              Correct Answer
            </Form.Label>
            <Form.Control
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter correct number (e.g., 3)"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </Form.Group>

          {/* Buttons */}
          {editing ? (
            <Button
              onClick={handleUpdate}
              style={{
                backgroundColor: green,
                color: "#fff",
                fontWeight: "600",
                padding: "10px 20px",
                fontSize: "1.1rem",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaEdit /> Update
            </Button>
          ) : (
            <Button
              onClick={handleAdd}
              style={{
                backgroundColor: green,
                color: "#fff",
                fontWeight: "600",
                padding: "10px 20px",
                fontSize: "1.1rem",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaPlus /> Add
            </Button>
          )}
        </Form>
      </Card>

      {/* 🔹 Existing Questions */}
      <div className="mb-5">
        <h4 style={{ marginBottom: "20px", color: textDark }}>Existing Questions</h4>
        {quizData.length === 0 ? (
          <p style={{ color: textMuted }}>No questions yet.</p>
        ) : (
          quizData.map((quiz) =>
            quiz.questions.map((q) => (
              <Card
                key={q._id}
                className="p-4 mb-4 shadow-sm"
                style={{
                  borderRadius: "12px",
                  borderLeft: `6px solid ${yellow}`,
                  backgroundColor: "#fff8e1",
                }}
              >
                <h5 style={{ fontWeight: "600" }}>{q.question}</h5>
                <div className="d-flex flex-wrap gap-4 mt-3">
                  {q.images.map((img, i) => (
                    
                    <img
                      key={i}
                      src={img.url}
                      alt={`Option ${i + 1}`}
                      width="80"
                      height="80"
                      style={{
                        borderRadius: "12px",
                        objectFit: "cover",
                        border: `2px solid ${green}`,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      }}
                    />
                  ))}
                </div>
                <p style={{ marginTop: "10px", fontWeight: "600" }}>
                  <span style={{ color: red }}>Answer:</span> {q.answer}
                </p>
                <div className="d-flex gap-3 mt-3">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(quiz._id, q)}
                    style={{
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(quiz._id, q._id)}
                    style={{
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
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

export default CountingQuizAdmin;

