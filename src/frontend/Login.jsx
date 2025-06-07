import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const green = '#2BCB9A';

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    navigate('/admin');
  };

  return (
    <div className="d-flex flex-column vh-100" style={{ backgroundColor: '#f2f2f2' }}>
      
      {/* Top Green Bar (increased height) */}
      <div style={{ height: '12px', backgroundColor: green }}></div>

      {/* Centered Login Card */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card shadow p-4" style={{ width: '350px', borderRadius: '12px', borderTop: `5px solid ${green}` }}>
          <h3 className="text-center mb-4 fw-semibold" style={{ color: green }}>Admin Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3 position-relative">
              <label htmlFor="email" className="form-label text-muted">Email address</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <Mail size={18} color={green} />
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control border-start-0"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label text-muted">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <Lock size={18} color={green} />
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control border-start-0"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-end mb-4">
              <small
                className="text-decoration-none"
                style={{ color: green, cursor: 'pointer' }}
                onClick={() => navigate('/admin/forgot-password')}
              >
                Forgot Password?
              </small>
            </div>

            <button type="submit" className="btn w-100 mb-3" style={{ backgroundColor: green, color: '#fff' }}>
              Login
            </button>

            {/* Register Option */}
            <div className="text-center">
              <small className="text-muted">
                Don’t have an account?{' '}
                <span
                  onClick={() => navigate('/admin/register')}
                  style={{ color: green, cursor: 'pointer', fontWeight: '500' }}
                >
                  Register
                </span>
              </small>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Green Bar (increased height) */}
      <div style={{ height: '12px', backgroundColor: green }}></div>
    </div>
  );
};

export default Login;
