import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import CRM from './CRM';
import AddNewVideo from './AddNewVideo';
import ManageCourses from './ManageCourses';
import ManageQuizzes from './ManageQuizzes';
import ManageAccounts from './ManageAccounts';
import ManageVideos from './ManageVideos';

// In src/index.js
import '../index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CRM />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/add-video" element={<AddNewVideo />} />
             <Route path="/admin/manage-courses" element={<ManageCourses />} />
             <Route path="/admin/manage-quizzes" element={<ManageQuizzes />} />
             <Route path="/admin/manage-accounts" element={<ManageAccounts />} />
             <Route path="/admin/manage-videos" element={<ManageVideos />} />
             <Route path="/admin/crm" element={<CRM />} />
      </Routes>
    </Router>
  );
}

export default App;
