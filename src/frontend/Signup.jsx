import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from './config';


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(`${API_BASE_URL}/api/admins/signup`, {
  username,   
  email,
  password,
});

    // Save token in local storage
    localStorage.setItem("adminToken", res.data.token);

    // Redirect after signup
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Signup failed. Try again.");
  }
};

  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px", borderTop: "5px solid #2BCB9A" }}>
        <h3 className="text-center mb-3" style={{ color: "#EF3349" }}>Admin Signup</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>Username</label>
            <input type="text" className="form-control" value={username}
              onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn w-100 text-white" style={{ backgroundColor: "#2BCB9A" }}>
            Sign Up
          </button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/admin/login" style={{ color: "#EF3349" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}


export default Signup;
