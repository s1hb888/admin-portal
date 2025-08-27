import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admins/login", {
  email,
  password,
});

      localStorage.setItem("adminToken", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px", borderTop: "5px solid #EF3349" }}>
        <h3 className="text-center mb-3" style={{ color: "#2BCB9A" }}>Admin Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
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
          <button className="btn w-100 text-white" style={{ backgroundColor: "#EF3349" }}>
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don’t have an account? <Link to="/admin/signup" style={{ color: "#2BCB9A" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

