import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // ✅ 8-12 chars, 1 uppercase, 1 digit, 1 special char
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,12}$/;
    return pattern.test(password);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validatePassword(password)) {
      setError(
        "Password must be 8-12 characters, include at least 1 uppercase letter, 1 digit, and 1 special character."
      );
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/admins/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setTimeout(() => navigate("/admin/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px", borderTop: "5px solid #EF3349" }}>
        <h3 className="text-center mb-3" style={{ color: "#2BCB9A" }}>Reset Password</h3>

        {message && <div className="alert alert-success">{message}</div>}
        
        <form onSubmit={handleReset}>
          {error && <div className="alert alert-danger">{error}</div>} {/* 👈 error above input */}

          <div className="mb-3">
            <label>New Password</label>
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
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#EF3349" }}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
