import React, { useState } from 'react';
import { Button, Form, Modal, Table, Alert } from 'react-bootstrap';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const academicCategories = ['English Alphabets', 'Urdu Alphabets', 'Numbers'];
const generalKnowledgeCategories = [
  'Vowels',
  'Colors',
  'Shapes',
  'Fruits & Vegetables',
  'Islamic Studies',
  'Body Parts',
];

const allCategories = [
  { group: 'Academic Learning', items: academicCategories },
  { group: 'General Knowledge', items: generalKnowledgeCategories },
];

const themeGreen = '#2BCB9A';
const themeYellow = '#FFD700';

const ManageCourses = () => {
  const [contentList, setContentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [category, setCategory] = useState(academicCategories[0]);
  const [group, setGroup] = useState('Academic Learning');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const openModal = (index = null) => {
    if (index !== null) {
      const item = contentList[index];
      setGroup(item.group);
      setCategory(item.category);
      setTitle(item.title);
      setDescription(item.description);
      setEditingIndex(index);
    } else {
      setGroup('Academic Learning');
      setCategory(academicCategories[0]);
      setTitle('');
      setDescription('');
      setEditingIndex(null);
    }
    setError('');
    setShowModal(true);
  };

  const handleSave = () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    const newItem = { group, category, title, description };
    if (editingIndex !== null) {
      const updatedList = [...contentList];
      updatedList[editingIndex] = newItem;
      setContentList(updatedList);
    } else {
      setContentList([...contentList, newItem]);
    }
    setShowModal(false);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedList = contentList.filter((_, i) => i !== index);
      setContentList(updatedList);
    }
  };

  const handleGroupChange = (e) => {
    const selectedGroup = e.target.value;
    setGroup(selectedGroup);
    const firstCategory = allCategories.find((g) => g.group === selectedGroup).items[0];
    setCategory(firstCategory);
  };

  return (
    <div className="container my-5" style={{ maxWidth: '900px' }}>
      <h2 className="mb-4" style={{ color: themeGreen }}>Manage Courses & Content</h2>

      <Button onClick={() => openModal()} className="mb-3 d-flex align-items-center" style={{ backgroundColor: themeGreen, borderColor: themeGreen }}>
        <PlusCircle size={18} className="me-2" /> Add New Content
      </Button>

      {contentList.length === 0 && (
        <Alert style={{ backgroundColor: themeYellow, color: '#333', fontWeight: '500' }}>No content added yet. Click "Add New Content" to start.</Alert>
      )}

      {contentList.length > 0 && (
        <Table bordered hover responsive>
          <thead style={{ backgroundColor: themeGreen, color: 'white' }}>
            <tr>
              <th>Group</th>
              <th>Category</th>
              <th>Title</th>
              <th>Description</th>
              <th style={{ width: '140px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contentList.map((item, index) => (
              <tr key={index}>
                <td>{item.group}</td>
                <td>{item.category}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <Button size="sm" style={{ backgroundColor: themeYellow, borderColor: themeYellow, color: '#000' }} className="me-2" onClick={() => openModal(index)}>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: themeGreen, color: 'white' }}>
          <Modal.Title>{editingIndex !== null ? 'Edit Content' : 'Add New Content'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Group</Form.Label>
            <Form.Select
              value={group}
              onChange={handleGroupChange}
              style={{ borderColor: themeGreen, boxShadow: `0 0 0 0.2rem ${themeGreen}40` }}
            >
              {allCategories.map(({ group }) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ borderColor: themeGreen, boxShadow: `0 0 0 0.2rem ${themeGreen}40` }}
            >
              {allCategories
                .find(({ group: g }) => g === group)
                .items.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ borderColor: themeGreen, boxShadow: `0 0 0 0.2rem ${themeGreen}40` }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export default ManageCourses;

