import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Alert, Modal } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/bodypartquiz";

const red = "#EF3349";
const green = "#2BCB9A";
const yellow = "#FFCF25";
const textDark = "#222";
const textMuted = "#6c757d";

const BodyPartsQuizAdmin = () => {
  const [quizData, setQuizData] = useState([]);
  const [quizTitle, setQuizTitle] = useState("Body Parts Quiz");
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [answer, setAnswer] = useState("");
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

  const resetForm = () => {
    setQuestion("");
    setImageUrl("");
    setAnswer("");
    setEditing(null);
    setError("");
  };

  const validateFields = () => {
    if (!question.trim()) return "Please enter a question.";
    if (!imageUrl.trim()) return "Please enter an image URL.";
    if (!answer.trim()) return "Please enter the correct answer.";
    return null;
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
      await axios.post(API_URL, {
        quiz_title: quizTitle,
        question,
        image_url: imageUrl,
        answer,
      });
      alert("✅ Question added successfully!");
      fetchQuizData();
      resetForm();
    } catch (err) {
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

    if (!window.confirm("Are you sure you want to update this question?")) return;

    try {
      await axios.put(`${API_URL}/${editing.quizId}/${editing.questionId}`, {
        question: question.trim(),
        image_url: imageUrl.trim(),
        answer: answer.trim(),
      });

      alert("✅ Question updated successfully!");
      fetchQuizData();
      resetForm();
      setShowEditModal(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update question!");
    }
  };

  const handleDelete = async (quizId, questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axios.delete(`${API_URL}/${quizId}/${questionId}`);
      alert("🗑 Question deleted successfully!");
      fetchQuizData();
    } catch (err) {
      alert("❌ Failed to delete question!");
    }
  };

  const handleEdit = (quizId, q) => {
    setEditing({ quizId, questionId: q._id });
    setQuestion(q.question);
    setImageUrl(q.image_url);
    setAnswer(q.answer);
    setShowEditModal(true); // ✅ Open the modal
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
        Body Parts Quiz Management
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

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>Image URL</Form.Label>
            <Form.Control
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Body Part"
                width="100"
                height="100"
                style={{
                  borderRadius: "10px",
                  marginTop: "10px",
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
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter correct answer"
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
                    src={q.image_url}
                    alt={q.question}
                    width="100"
                    height="100"
                    style={{
                      borderRadius: "12px",
                      objectFit: "cover",
                      border: `2px solid ${green}`,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <p style={{ marginTop: "10px", fontWeight: "600" }}>
                    <span style={{ color: red }}>Answer:</span> {q.answer}
                  </p>
                </div>
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

      {/* ✅ Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: green, color: "#fff" }}>
          <Modal.Title>Edit Question</Modal.Title>
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
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Edit correct answer"
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
              backgroundColor: yellow, // 💛 Updated color
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

export default BodyPartsQuizAdmin;
