import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Alert, Modal } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/fruitquiz";

const red = "#EF3349";
const green = "#2BCB9A";
const yellow = "#FFCF25";
const textDark = "#222";
const textMuted = "#6c757d";

const FruitQuizAdmin = () => {
  const [quizData, setQuizData] = useState([]);
  const [quizTitle, setQuizTitle] = useState("Fruit Race Quiz");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { word: "", image_url: "", sound_text: "" },
    { word: "", image_url: "", sound_text: "" },
    { word: "", image_url: "", sound_text: "" },
    { word: "", image_url: "", sound_text: "" },
  ]);
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

  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const validateFields = () => {
    if (!question.trim()) return "Please enter a question.";
    if (options.some((opt) => !opt.word.trim() || !opt.image_url.trim()))
      return "Please fill all option fields (Word + Image URL).";
    if (!winner.trim()) return "Please enter the correct fruit name.";
    return null;
  };

  const handleAdd = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    const newQuestion = { question, options, winner };

    try {
      await axios.post(API_URL, {
        quiz_title: quizTitle,
        questions: [newQuestion],
      });
      alert("✅ Question added successfully!");
      fetchQuizData();
      resetForm();
    } catch (err) {
      console.error("❌ Error adding question:", err.response?.data || err.message);
      alert("Failed to add question!");
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

    try {
      await axios.put(`${API_URL}/${editing.quizId}/${editing.questionId}`, {
        question,
        options,
        winner,
      });
      alert("✅ Question updated successfully!");
      fetchQuizData();
      resetForm();
      setEditing(null);
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
    setOptions(q.options);
    setWinner(q.winner);
    setEditing({ quizId, questionId: q._id });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setQuestion("");
    setOptions([
      { word: "", image_url: "", sound_text: "" },
      { word: "", image_url: "", sound_text: "" },
      { word: "", image_url: "", sound_text: "" },
      { word: "", image_url: "", sound_text: "" },
    ]);
    setWinner("");
    setError("");
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
        Fruit Quiz Management
      </h2>

      {/* Add Form */}
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
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>
              Question
            </Form.Label>
            <Form.Control
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter quiz question"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </Form.Group>

          <h5 style={{ marginBottom: "15px", color: textDark }}>
            Options (Word + Image)
          </h5>
          {options.map((opt, index) => (
            <div key={index} className="d-flex gap-3 mb-3 align-items-center flex-wrap">
              <Form.Control
                placeholder="Word"
                value={opt.word}
                onChange={(e) => handleOptionChange(index, "word", e.target.value)}
                style={{ flex: "1", minWidth: "150px", padding: "10px" }}
              />
              <Form.Control
                placeholder="Image URL"
                value={opt.image_url}
                onChange={(e) => handleOptionChange(index, "image_url", e.target.value)}
                style={{ flex: "2", minWidth: "200px", padding: "10px" }}
              />
              {opt.image_url && (
                <img
                  src={opt.image_url}
                  alt="fruit"
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

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>
              Winner Fruit
            </Form.Label>
            <Form.Control
              value={winner}
              onChange={(e) => setWinner(e.target.value)}
              placeholder="Enter correct fruit name"
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

      {/* Existing Questions */}
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
                  {q.options.map((opt, i) => (
                    <div key={i} className="text-center">
                      <img
                        src={opt.image_url}
                        alt={opt.word}
                        width="80"
                        height="80"
                        style={{
                          borderRadius: "12px",
                          objectFit: "cover",
                          border: `2px solid ${green}`,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        }}
                      />
                      <p style={{ marginTop: "5px", fontWeight: "500" }}>{opt.word}</p>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: "10px", fontWeight: "600" }}>
                  <span style={{ color: red }}>Winner:</span> {q.winner}
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
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: green, color: "#fff" }}>
          <Modal.Title>Edit Fruit Question</Modal.Title>
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

            <h5 style={{ marginBottom: "15px", color: textDark }}>
              Options (Edit Word + Image URL)
            </h5>
            {options.map((opt, index) => (
              <div key={index} className="d-flex gap-3 mb-3 align-items-center flex-wrap">
                <Form.Control
                  placeholder="Word"
                  value={opt.word}
                  onChange={(e) => handleOptionChange(index, "word", e.target.value)}
                  style={{ flex: "1", minWidth: "150px" }}
                />
                <Form.Control
                  placeholder="Image URL"
                  value={opt.image_url}
                  onChange={(e) => handleOptionChange(index, "image_url", e.target.value)}
                  style={{ flex: "2", minWidth: "200px" }}
                />
                {opt.image_url && (
                  <img
                    src={opt.image_url}
                    alt="fruit"
                    width="60"
                    height="60"
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                      border: `2px solid ${yellow}`,
                    }}
                  />
                )}
              </div>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Winner Fruit</Form.Label>
              <Form.Control
                value={winner}
                onChange={(e) => setWinner(e.target.value)}
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
              color: "#fff",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            style={{
              backgroundColor: yellow,
              border: "none",
              fontWeight: "600",
              color: "#000",
            }}
          >
            <FaEdit /> Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FruitQuizAdmin;
