import React, { useState } from 'react';
import { Button, Form, Modal, Table, Alert } from 'react-bootstrap';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const themeGreen = '#2BCB9A';
const themeYellow = '#FFD700';

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const openModal = (index = null) => {
    if (index !== null) {
      const item = quizzes[index];
      setQuestion(item.question);
      setAnswer(item.answer);
      setEditingIndex(index);
    } else {
      setQuestion('');
      setAnswer('');
      setEditingIndex(null);
    }
    setError('');
    setShowModal(true);
  };

  const handleSave = () => {
    if (!question.trim() || !answer.trim()) {
      setError('Both Question and Answer are required');
      return;
    }

    const newQuiz = { question, answer };

    if (editingIndex !== null) {
      const updated = [...quizzes];
      updated[editingIndex] = newQuiz;
      setQuizzes(updated);
    } else {
      setQuizzes([...quizzes, newQuiz]);
    }
    setShowModal(false);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      const updated = quizzes.filter((_, i) => i !== index);
      setQuizzes(updated);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '900px' }}>
      <h2 className="mb-4" style={{ color: themeGreen }}>Manage General Knowledge Quizzes</h2>

      <Button
        onClick={() => openModal()}
        className="mb-3 d-flex align-items-center"
        style={{ backgroundColor: themeGreen, borderColor: themeGreen }}
      >
        <PlusCircle size={18} className="me-2" /> Add New Quiz
      </Button>

      {quizzes.length === 0 && (
        <Alert style={{ backgroundColor: themeYellow, color: '#333', fontWeight: '500' }}>
          No quizzes added yet. Click "Add New Quiz" to start.
        </Alert>
      )}

      {quizzes.length > 0 && (
        <Table bordered hover responsive>
          <thead style={{ backgroundColor: themeGreen, color: 'white' }}>
            <tr>
              <th>Question</th>
              <th>Correct Answer</th>
              <th style={{ width: '140px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr key={index}>
                <td>{quiz.question}</td>
                <td>{quiz.answer}</td>
                <td>
                  <Button
                    size="sm"
                    style={{ backgroundColor: themeYellow, borderColor: themeYellow, color: '#000' }}
                    className="me-2"
                    onClick={() => openModal(index)}
                  >
                    <Edit size={14} className="me-1" /> Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(index)}>
                    <Trash2 size={14} className="me-1" /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: themeGreen, color: 'white' }}>
          <Modal.Title>{editingIndex !== null ? 'Edit Quiz' : 'Add New Quiz'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter quiz question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{ borderColor: themeGreen, boxShadow: `0 0 0 0.2rem ${themeGreen}40` }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter correct answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={{ borderColor: themeGreen, boxShadow: `0 0 0 0.2rem ${themeGreen}40` }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: '#aaa', borderColor: '#aaa', color: 'white' }} onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button style={{ backgroundColor: themeGreen, borderColor: themeGreen }} onClick={handleSave}>
            {editingIndex !== null ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageQuizzes;
