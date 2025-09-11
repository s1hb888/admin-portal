// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // index.css import
import Terms from "./Terms";
import ForgotPassword from "./ForgotPassword";
// Components / Pages
import Login from './Login';
import Signup from './Signup';
import CRM from './CRM';
import AddNewVideo from './AddNewVideo';
import ManageCourses from './ManageCourses';
import ResetPassword from "./ResetPassword";
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
import Profile from './Profile';

function App() {
  // ✅ Check if admin is logged in using token from localStorage
  const isLoggedIn = !!localStorage.getItem("adminToken");

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={isLoggedIn ? <CRM /> : <Login />} />

        {/* Authentication routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Signup />} />

        {/* Profile */}
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/admin/login" />} />

        {/* Admin / CRM routes */}
        <Route path="/admin/add-video" element={isLoggedIn ? <AddNewVideo /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/manage-courses" element={isLoggedIn ? <ManageCourses /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/manage-quizzes" element={isLoggedIn ? <ManageQuizzes /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/manage-accounts" element={isLoggedIn ? <ManageAccounts /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/manage-videos" element={isLoggedIn ? <ManageVideos /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/manage-academics" element={isLoggedIn ? <ManageAcademics /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/manage-gk" element={isLoggedIn ? <ManageGK /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/alphabet-crud" element={isLoggedIn ? <AlphabetCRUD /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/urdu-crud" element={isLoggedIn ? <UrduCRUD /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/maths-crud" element={isLoggedIn ? <MathsCRUD /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/vowels-crud" element={isLoggedIn ? <VowelsCRUD /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/fruits-crud" element={isLoggedIn ? <FruitsCRUD /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/vegetables-crud" element={isLoggedIn ? <VegetablesCRUD /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/bodyparts-crud" element={isLoggedIn ? <BodypartsCRUD /> : <Navigate to="/admin/login" />} />
        <Route path="/terms" element={<Terms />} /> 
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* CRM route */}
        <Route path="/admin/crm" element={isLoggedIn ? <CRM /> : <Navigate to="/admin/login" />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
