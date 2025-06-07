import React, { useState } from 'react';
import { Button, Modal, Form, Alert, Card, Row, Col } from 'react-bootstrap';
import { Edit, Trash2 } from 'lucide-react';

const themeGreen = '#2BCB9A';
const themeYellow = '#FFD700';

const initialAccounts = [
  { email: 'parent1@example.com', kidName: 'Ali', age: 5 },
  { email: 'parent2@example.com', kidName: 'Ayesha', age: 6 },
];

const ManageAccounts = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ email: '', kidName: '', age: '' });
  const [error, setError] = useState('');

  const openModal = (index) => {
    setEditingIndex(index);
    setForm(accounts[index]);
    setError('');
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      const updated = accounts.filter((_, i) => i !== index);
      setAccounts(updated);
    }
  };

  const handleSave = () => {
    const { email, kidName, age } = form;
    if (!email || !kidName || !age) {
      setError('All fields are required.');
      return;
    }
    const updated = [...accounts];
    updated[editingIndex] = form;
    setAccounts(updated);
    setShowModal(false);
  };

  return (
    <div className="container my-5" style={{ maxWidth: '900px' }}>
      <h2 className="mb-4" style={{ color: themeGreen }}>Manage Parent Accounts</h2>

      {accounts.length === 0 ? (
        <Alert style={{ backgroundColor: themeYellow, fontWeight: '500' }}>
          No parent accounts found.
        </Alert>
      ) : (
        <Row xs={1} md={2} className="g-4">
          {accounts.map((acc, index) => (
            <Col key={index}>
              <Card style={{ borderColor: themeGreen }}>
                <Card.Body>
                  <Card.Title style={{ color: themeGreen }}>{acc.kidName}</Card.Title>
                  <Card.Text><strong>Email:</strong> {acc.email}</Card.Text>
                  <Card.Text><strong>Age:</strong> {acc.age}</Card.Text>
                  <div className="d-flex justify-content-end">
                    <Button
                      size="sm"
                      className="me-2"
                      style={{ backgroundColor: themeYellow, borderColor: themeYellow, color: '#000' }}
                      onClick={() => openModal(index)}
                    >
                      <Edit size={14} className="me-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 size={14} className="me-1" /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: themeGreen, color: 'white' }}>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ borderColor: themeGreen, boxShadow: `0 0 0 0.2rem ${themeGreen}40` }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Kid’s Name</Form.Label>
            <Form.Control
              type="text"
              value={form.kidName}
              onChange={(e) => setForm({ ...form, kidName: e.target.value })}
              style={{ borderColor: themeGreen, boxShadow: `0 0 0 0.2rem ${themeGreen}40` }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              style={{ borderColor: themeGreen, boxShadow: `0 0 0 0.2rem ${themeGreen}40` }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: '#aaa', borderColor: '#aaa', color: 'white' }} onClick={() => setShowModal(false)}>Cancel</Button>
          <Button style={{ backgroundColor: themeGreen, borderColor: themeGreen }} onClick={handleSave}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageAccounts;
