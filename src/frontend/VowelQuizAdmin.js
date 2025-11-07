import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Alert, Modal } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/vowelquiz";

const colors = {
  red: "#EF3349",
  green: "#2BCB9A",
  yellow: "#FFCF25",
  textDark: "#222",
  textMuted: "#6c757d",
};

const VowelQuizAdmin = () => {
  const [quizData, setQuizData] = useState([]);
  const [quizTitle] = useState("Vowel Quiz");
  const [question, setQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch quizzes
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

  // Field validation
  const validateFields = () => {
    if (!question.trim()) return "Please enter a question.";
    if (!imageUrl.trim()) return "Please enter an image URL.";
    if (!correctAnswer.trim()) return "Please enter the correct vowel.";
    return null;
  };

  // Reset form fields
  const resetForm = () => {
    setQuestion("");
    setImageUrl("");
    setCorrectAnswer("");
    setError("");
    setEditing(null);
    setShowEditModal(false);
  };

  // Add Question
  const handleAdd = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    if (!window.confirm("Add this question?")) return;

    try {
      const existingQuiz = quizData[0];

      if (existingQuiz) {
        await axios.post(`${API_URL}/${existingQuiz._id}/questions`, {
          question,
          image_url: imageUrl,
          correct_answer: correctAnswer,
        });
      } else {
        await axios.post(API_URL, {
          quiz_title: quizTitle,
          questions: [
            { question, image_url: imageUrl, correct_answer: correctAnswer },
          ],
        });
      }

      alert("✅ Question added successfully!");
      fetchQuizData();
      resetForm();
    } catch (err) {
      console.error("Error adding question:", err);
      alert("❌ Failed to add question!");
    }
  };

  // Open Edit Modal
  const handleEditClick = (quizId, q) => {
    setQuestion(q.question);
    setImageUrl(q.image_url);
    setCorrectAnswer(q.correct_answer);
    setEditing({ quizId, questionId: q._id });
    setShowEditModal(true);
  };

  // Update Question
  const handleUpdate = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    if (!editing) return;
    if (!window.confirm("Update this question?")) return;

    try {
      await axios.put(`${API_URL}/${editing.quizId}/${editing.questionId}`, {
        question,
        image_url: imageUrl,
        correct_answer: correctAnswer,
      });
      alert("✅ Question updated successfully!");
      fetchQuizData();
      resetForm();
    } catch (err) {
      console.error("Error updating question:", err);
      alert("❌ Failed to update question!");
    }
  };

  // Delete Question
  const handleDelete = async (quizId, questionId) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await axios.delete(`${API_URL}/${quizId}/${questionId}`);
      alert("✅ Question deleted successfully!");
      fetchQuizData();
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("❌ Failed to delete question!");
    }
  };

  return (
    <div
      className="container my-5"
      style={{
        maxWidth: "900px",
        border: `3px solid ${colors.green}`,
        borderRadius: "15px",
        padding: "30px",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          color: colors.yellow,
          fontWeight: "900",
          fontSize: "2.5rem",
          marginBottom: "40px",
          textAlign: "left",
        }}
      >
        Vowel Quiz Management
      </h2>

      {/* Add Form */}
      <Card
        className="p-4 shadow-sm mb-5"
        style={{
          borderRadius: "15px",
          border: `2px solid ${colors.green}`,
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
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>
              Question
            </Form.Label>
            <Form.Control
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter question e.g. Which vowel is shown above?"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>
              Image URL
            </Form.Label>
            <Form.Control
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>
              Correct Answer
            </Form.Label>
            <Form.Control
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Enter correct vowel (a, e, i, o, u)"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </Form.Group>

          <Button onClick={handleAdd} style={buttonStyle(colors.green)}>
            <FaPlus /> Add
          </Button>
        </Form>
      </Card>

      {/* Display Existing Questions */}
      <div className="mb-5">
        <h4 style={{ marginBottom: "20px", color: colors.textDark }}>Existing Questions</h4>

        {quizData.length === 0 ? (
          <p style={{ color: colors.textMuted }}>No questions yet.</p>
        ) : (
          quizData.map((quiz) =>
            quiz.questions.map((q) => (
              <Card
                key={q._id}
                className="p-4 mb-4 shadow-sm"
                style={{
                  borderRadius: "12px",
                  borderLeft: `6px solid ${colors.yellow}`,
                  backgroundColor: "#fff8e1",
                }}
              >
                <h5 style={{ fontWeight: "600", color: colors.textDark }}>{q.question}</h5>

                {q.image_url && (
                  <img
                    src={q.image_url}
                    alt="vowel"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                      marginTop: "10px",
                    }}
                  />
                )}

                <p style={{ marginTop: "10px", fontWeight: "600" }}>
                  <span style={{ color: colors.red }}>Correct Answer:</span> {q.correct_answer}
                </p>

                <div className="d-flex gap-3 mt-3">
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(quiz._id, q)}
                    style={iconButtonStyle()}
                  >
                    <FaEdit /> Edit
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(quiz._id, q._id)}
                    style={iconButtonStyle()}
                  >
                    <FaTrash /> Delete
                  </Button>
                </div>
              </Card>
            ))
          )
        )}
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={resetForm} centered>
        <Modal.Header closeButton style={{ backgroundColor: colors.green, color: "#fff" }}>
          <Modal.Title>Edit Vowel Question</Modal.Title>
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
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="preview"
                  width="100"
                  height="100"
                  className="mt-2"
                  style={{ borderRadius: "10px", border: `2px solid ${colors.yellow}` }}
                />
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={resetForm} style={{ backgroundColor: colors.red, border: "none", fontWeight: "600" }}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} style={{ backgroundColor: colors.yellow, border: "none", fontWeight: "600", color: "#000" }}>
            <FaEdit /> Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// ✅ Helper Styles
const buttonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: "#fff",
  fontWeight: "600",
  padding: "10px 20px",
  fontSize: "1.1rem",
  border: "none",
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const iconButtonStyle = () => ({
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

export default VowelQuizAdmin;
