import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Alert, Modal } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/vegetablequiz";

const red = "#EF3349";
const green = "#2BCB9A";
const yellow = "#FFCF25";
const textDark = "#222";
const textMuted = "#6c757d";

const VegetableQuizAdmin = () => {
  const [quizData, setQuizData] = useState([]);
  const [quizTitle, setQuizTitle] = useState("Vegetable Quiz");
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState({ word: "", image_url: "" });
  const [winner, setWinner] = useState("");
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

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
    if (!question.trim()) return "Please enter a question.";
    if (!option.word.trim() || !option.image_url.trim())
      return "Please fill both vegetable name and image URL.";
    if (!winner.trim()) return "Please enter the correct vegetable name.";
    return null;
  };

  const resetForm = () => {
    setQuestion("");
    setOption({ word: "", image_url: "" });
    setWinner("");
    setError("");
    setEditing(null);
  };

  const handleAdd = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    if (!window.confirm("Are you sure you want to add this question?")) return;

    try {
      const newQuestion = {
        quiz_title: quizTitle,
        question,
        options: option,
        winner,
      };
      await axios.post(API_URL, newQuestion);
      alert("✅ Question added successfully!");
      fetchQuizData();
      resetForm();
    } catch (err) {
      console.error("Error adding question:", err);
      alert("❌ Failed to add question!");
    }
  };

  const handleUpdate = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    if (!editing) return;

    if (!window.confirm("Are you sure you want to update this question?")) return;

    try {
      await axios.put(`${API_URL}/${editing.quizId}/${editing.questionId}`, {
        question,
        options: option,
        winner,
      });
      alert("✅ Question updated successfully!");
      fetchQuizData();
      resetForm();
      setShowEditModal(false);
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

  const handleEditClick = (quizId, q) => {
    setQuestion(q.question);
    setOption(q.options || { word: "", image_url: "" });
    setWinner(q.winner);
    setEditing({ quizId, questionId: q._id });
    setShowEditModal(true);
  };

  return (
    <div
      className="container my-5"
      style={{
        maxWidth: "900px",
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
        Vegetable Quiz Management
      </h2>

      {/* ✅ Add Form */}
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

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>Question</Form.Label>
            <Form.Control
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter quiz question"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </Form.Group>

          <h5 style={{ marginBottom: "15px", color: textDark }}>Vegetable Name + Image</h5>

          <div className="d-flex gap-3 mb-3 align-items-center flex-wrap">
            <Form.Control
              placeholder="Vegetable Name"
              value={option.word}
              onChange={(e) => setOption({ ...option, word: e.target.value })}
              style={{ flex: "1", minWidth: "150px", padding: "10px" }}
            />
            <Form.Control
              placeholder="Image URL"
              value={option.image_url}
              onChange={(e) => setOption({ ...option, image_url: e.target.value })}
              style={{ flex: "2", minWidth: "200px", padding: "10px" }}
            />
            {option.image_url && (
              <img
                src={option.image_url}
                alt="veg"
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

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>Correct Vegetable</Form.Label>
            <Form.Control
              value={winner}
              onChange={(e) => setWinner(e.target.value)}
              placeholder="Enter correct vegetable name"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </Form.Group>

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
        </Form>
      </Card>

      {/* ✅ Existing Questions */}
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

                <div className="text-center mt-3">
                  <img
                    src={q.options?.image_url}
                    alt={q.options?.word}
                    width="100"
                    height="100"
                    style={{
                      borderRadius: "12px",
                      objectFit: "cover",
                      border: `2px solid ${green}`,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <p style={{ marginTop: "5px", fontWeight: "500" }}>{q.options?.word}</p>
                </div>

                <p style={{ marginTop: "10px", fontWeight: "600" }}>
                  <span style={{ color: red }}>Winner:</span> {q.winner}
                </p>

                <div className="d-flex gap-3 mt-3">
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(quiz._id, q)}
                    style={{ fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(quiz._id, q._id)}
                    style={{ fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <FaTrash /> Delete
                  </Button>
                </div>
              </Card>
            ))
          )
        )}
      </div>

      {/* 🟡 Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: green, color: "#fff" }}>
          <Modal.Title>Edit Vegetable Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" style={{ fontWeight: "600", fontSize: "1rem" }}>
              {error}
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Edit question"
              />
            </Form.Group>

            <h6>Vegetable Name + Image</h6>
            <Form.Group className="mb-2">
              <Form.Control
                value={option.word}
                onChange={(e) => setOption({ ...option, word: e.target.value })}
                placeholder="Vegetable Name"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                value={option.image_url}
                onChange={(e) => setOption({ ...option, image_url: e.target.value })}
                placeholder="Image URL"
              />
              {option.image_url && (
                <img
                  src={option.image_url}
                  alt="veg preview"
                  width="100"
                  height="100"
                  className="mt-2"
                  style={{ borderRadius: "10px", border: `2px solid ${yellow}` }}
                />
              )}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Correct Vegetable</Form.Label>
              <Form.Control
                value={winner}
                onChange={(e) => setWinner(e.target.value)}
                placeholder="Enter correct vegetable"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setShowEditModal(false)}
            style={{ backgroundColor: red, border: "none", fontWeight: "600" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            style={{ backgroundColor: yellow, border: "none", fontWeight: "600", color: "#000" }}
          >
            <FaEdit /> Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VegetableQuizAdmin;
