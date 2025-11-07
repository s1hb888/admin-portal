import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Alert, Modal } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/colorquiz";
const red = "#EF3349";
const green = "#2BCB9A";
const yellow = "#FFCF25";
const textDark = "#222";
const textMuted = "#6c757d";

const ColorQuizAdmin = () => {
  const [quizData, setQuizData] = useState([]);
  const [quizTitle, setQuizTitle] = useState("Color Quiz");
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
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
      console.error("Error fetching color quiz:", err);
    }
  };

  // ✅ Validation
  const validateFields = () => {
    if (!question.trim()) return "Please enter a question.";
    if (!imageUrl.trim()) return "Please enter an image URL.";
    if (!correctAnswer.trim()) return "Please enter the correct color name.";
    return null;
  };

  const handleAdd = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    if (!window.confirm("Are you sure you want to add this color question?")) return;

    try {
      const newQuestion = {
        quiz_title: quizTitle,
        question,
        image_url: imageUrl,
        correct_answer: correctAnswer,
      };
      await axios.post(API_URL, newQuestion);
      alert("✅ Question added successfully!");
      fetchQuizData();
      resetForm();
    } catch (err) {
      console.error("Error adding color question:", err);
      alert("❌ Failed to add question!");
    }
  };

  const handleUpdate = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!editing) {
      alert("No question selected for editing!");
      return;
    }

    if (!window.confirm("Are you sure you want to update this color question?")) return;

    try {
      await axios.put(`${API_URL}/${editing.quizId}/${editing.questionId}`, {
        question,
        image_url: imageUrl,
        correct_answer: correctAnswer,
      });
      alert("✅ Question updated successfully!");
      fetchQuizData();
      resetForm();
      setEditing(null);
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating color question:", err);
      alert("❌ Update failed!");
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
    setImageUrl(q.image_url);
    setCorrectAnswer(q.correct_answer);
    setEditing({ quizId, questionId: q._id });
    setShowEditModal(true); // ✅ Open modal
  };

  const resetForm = () => {
    setQuestion("");
    setImageUrl("");
    setCorrectAnswer("");
    setError("");
  };

  return (
    <div
      className="container my-5"
      style={{
        maxWidth: "1000px",
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
        Color Quiz Management
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
              placeholder="Example: What is the color of the sky?"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>Image URL</Form.Label>
            <Form.Control
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL of the color item"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Color"
                width="100"
                height="100"
                style={{
                  marginTop: "15px",
                  borderRadius: "10px",
                  border: `2px solid ${yellow}`,
                  objectFit: "cover",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>Correct Answer</Form.Label>
            <Form.Control
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Enter correct color name (e.g. Blue)"
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

      {/* ✅ Existing Questions List */}
      <div className="mb-5">
        <h4 style={{ marginBottom: "20px", color: textDark }}>Existing Questions</h4>
        {quizData.length === 0 ? (
          <p style={{ color: textMuted }}>No color questions yet.</p>
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
                <h5 style={{ fontWeight: "600", color: red }}>{q.question}</h5>
                {q.image_url && (
                  <img
                    src={q.image_url}
                    alt="quiz"
                    width="120"
                    height="120"
                    style={{
                      borderRadius: "10px",
                      marginTop: "10px",
                      border: `2px solid ${green}`,
                      objectFit: "cover",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                )}
                <p style={{ marginTop: "10px", fontWeight: "600" }}>
                  <span style={{ color: red }}>Answer:</span> {q.correct_answer}
                </p>
                <div className="d-flex gap-3 mt-3">
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(quiz._id, q)}
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

      {/* ✅ Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: green, color: "#fff" }}>
          <Modal.Title>Edit Color Question</Modal.Title>
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

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Edit image URL"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  width="100"
                  height="100"
                  className="mt-2"
                  style={{ borderRadius: "10px", border: `2px solid ${yellow}` }}
                />
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Edit correct color name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setShowEditModal(false)}
            style={{
              backgroundColor: red,
              border: "none",
              fontWeight: "600",
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: yellow,
              border: "none",
              fontWeight: "600",
              color: "#000",
            }}
            onClick={handleUpdate}
          >
            <FaEdit /> Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ColorQuizAdmin;
