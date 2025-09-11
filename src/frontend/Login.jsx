import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { API_BASE_URL } from "./config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // ✅ Terms checkbox
  const navigate = useNavigate();

  // ✅ Regex rules (same as Signup.jsx)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Terms & Conditions check
    if (!termsAccepted) {
      setError("You must accept the Terms and Conditions.");
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
      const res = await axios.post(`${API_BASE_URL}/api/admins/login`, {
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("adminToken", res.data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderTop: "5px solid #EF3349" }}
      >
        <h3 className="text-center mb-3" style={{ color: "#2BCB9A" }}>
          Admin Login
        </h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
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

          {/* ✅ Forget Password */}
          <div className="d-flex justify-content-end mb-3">
            <Link to="/forgot-password" style={{ color: "#EF3349" }}>
              Forgot Password?
            </Link>
          </div>

          {/* ✅ Terms and Conditions */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="terms">
  I accept the{" "}
  <Link to="/terms" style={{ color: "#2BCB9A" }}>
    Terms & Conditions
  </Link>
</label>
          </div>

          <button
  type="submit"
  className="btn w-100 text-white"
  style={{ backgroundColor: "#EF3349" }}
>
  Login
</button>
        </form>

        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <Link to="/admin/signup" style={{ color: "#2BCB9A" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
