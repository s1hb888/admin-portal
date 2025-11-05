import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/vowelquiz";

const red = "#EF3349";
const green = "#2BCB9A";
const yellow = "#FFCF25";
const textDark = "#222";
const textMuted = "#6c757d";

const VowelQuizAdmin = () => {
  const [quizData, setQuizData] = useState([]);
  const [quizTitle, setQuizTitle] = useState("Vowel Quiz");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
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
    if (!question.trim()) return "Please enter a question.";
    if (!correctAnswer.trim()) return "Please enter the correct vowel.";
    return null;
  };

  const handleAdd = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    if (!window.confirm("Add this question?")) return;

    try {
      await axios.post(API_URL, {
        quiz_title: quizTitle,
        question,
        correct_answer: correctAnswer,
      });
      alert("✅ Question added successfully!");
      fetchQuizData();
      resetForm();
    } catch (err) {
      console.error("Error adding question:", err);
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
    if (!window.confirm("Update this question?")) return;

    try {
      await axios.put(`${API_URL}/${quizId}/${questionId}`, {
        question,
        correct_answer: correctAnswer,
      });
      alert("✅ Question updated successfully!");
      fetchQuizData();
      resetForm();
      setEditing(null);
    } catch (err) {
      console.error("Error updating question:", err);
      alert("❌ Failed to update question!");
    }
  };

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

  const resetForm = () => {
    setQuestion("");
    setCorrectAnswer("");
    setError("");
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
          fontSize: "2.5rem",
          marginBottom: "40px",
          textAlign: "left",
        }}
      >
        Vowel Quiz Management
      </h2>

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
              placeholder="Enter quiz question e.g. Which vowel is this?"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: "600", fontSize: "1.2rem" }}>Correct Answer</Form.Label>
            <Form.Control
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Enter correct vowel (a, e, i, o, u)"
              style={{ fontSize: "1rem", padding: "12px" }}
            />
          </Form.Group>

          {editing ? (
            <Button
              onClick={() => handleEdit(editing.quizId, editing.questionId)}
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
                <h5 style={{ fontWeight: "600", color: textDark }}>{q.question}</h5>
                <p style={{ marginTop: "10px", fontWeight: "600" }}>
                  <span style={{ color: red }}>Correct Answer:</span> {q.correct_answer}
                </p>

                <div className="d-flex gap-3 mt-3">
                  <Button
                    variant="warning"
                    onClick={() => {
                      setQuestion(q.question);
                      setCorrectAnswer(q.correct_answer);
                      setEditing({ quizId: quiz._id, questionId: q._id });
                    }}
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

export default VowelQuizAdmin;
