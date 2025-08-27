import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Signup from './Signup';
import CRM from './CRM';
import AddNewVideo from './AddNewVideo';
import ManageCourses from './ManageCourses';
import ManageQuizzes from './ManageQuizzes';
import ManageAccounts from './ManageAccounts';
import ManageVideos from './ManageVideos';
import ManageGK from './ManageGK';
import ManageAcademics from './ManageAcademics';
import AlphabetCRUD from './AlphabetCRUD';
import UrduCRUD from './UrduCRUD';
import MathsCRUD from './MathsCRUD';
import VowelsCRUD from './VowelsCRUD';
import FruitsCRUD from './FruitsCRUD';
import VegetablesCRUD from './VegetablesCRUD';
import BodypartsCRUD from './BodypartsCRUD';

// In src/index.js
import '../index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CRM />} />
          <Route path="/admin/login" element={<Login />} />
       <Route path="/admin/signup" element={<Signup />} />

        <Route path="/admin/add-video" element={<AddNewVideo />} />
        <Route path="/admin/manage-courses" element={<ManageCourses />} />
        <Route path="/admin/manage-quizzes" element={<ManageQuizzes />} />
        <Route path="/admin/manage-accounts" element={<ManageAccounts />} />
        <Route path="/admin/manage-videos" element={<ManageVideos />} />
        <Route path="/admin/manage-academics" element={<ManageAcademics />} />
        <Route path="/admin/manage-gk" element={<ManageGK />} />
        <Route path="/admin/alphabet-crud" element={<AlphabetCRUD />} />
        <Route path="/admin/urdu-crud" element={<UrduCRUD />} />
        <Route path="/admin/maths-crud" element={<MathsCRUD />} />
        <Route path="/admin/vowels-crud" element={<VowelsCRUD />} />
        <Route path="/admin/fruits-crud" element={<FruitsCRUD />} />
        <Route path="/admin/vegetables-crud" element={<VegetablesCRUD />} />
        <Route path="/admin/bodyparts-crud" element={<BodypartsCRUD />} />
        <Route path="/admin/crm" element={<CRM />} />
      </Routes>
    </Router>
  );
}

export default App;
