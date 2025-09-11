import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "./config";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Regex rules
  const usernameRegex = /^[A-Za-z\s]+$/; // only letters + space
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic email validation
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Username validation
    if (!usernameRegex.test(username)) {
      setError("Username should contain only letters and spaces.");
      return;
    }

    // ✅ Email validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // ✅ Password validation
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 8–12 characters, include at least 1 uppercase, 1 number, and 1 special character."
      );
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/admins/signup`, {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      // Save token in local storage
      localStorage.setItem("adminToken", res.data.token);

      // Redirect after signup
      navigate("/admin/login");
    } catch (err) {
      console.error("Signup Error:", err.response?.data); // Debugging
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderTop: "5px solid #2BCB9A" }}
      >
        <h3 className="text-center mb-3" style={{ color: "#EF3349" }}>
          Admin Signup
        </h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSignup}>
          {/* Username */}
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with eye toggle */}
          <div className="mb-3 position-relative">
            <label>Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            className="btn w-100 text-white"
            style={{ backgroundColor: "#2BCB9A" }}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/admin/login" style={{ color: "#EF3349" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
