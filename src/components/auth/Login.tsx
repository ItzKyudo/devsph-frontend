import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../css/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const API_URL = "http://localhost:8000";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/login`, loginData);
      if (response.data.success) {
        navigate('/');
      } else {
        alert("Login Failed: " + response.data.message);
      }
    } catch (error) {
      alert("An error occurred: " + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsGoogleLoading(true);
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );
        const loginResponse = await axios.post(`${API_URL}/google-login`, {
          email: userInfo.data.email,
          name: userInfo.data.name,
          googleId: userInfo.data.sub
        });

        if (loginResponse.data.success) {
          navigate('/');
        } else {
          alert("Google Login Failed: " + loginResponse.data.message);
        }
      } catch (error) {
        alert("An error occurred during Google login: " + (error instanceof Error ? error.message : 'Unknown error'));
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      alert('Google Login Failed');
      setIsGoogleLoading(false);
    }
  });

  return (
    <div className="auth-background">
      <div className="auth-container">
        <div className="auth-split-container">
          <div className="auth-image-side">
            <div className="floating-particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
            <img src="/icon.png" alt="DEVS PH Logo" />
          </div>
          <div className="auth-form-side">
            <div className="auth-brand">
              DEVS <span style={{ color: "#CE1126" }}>P</span><span style={{ color: "#0038A8" }}>H</span>
            </div>
            <hr className="auth-divider"/>
            <h2 className="auth-title">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="auth-form-group">
                <label className="auth-label" htmlFor="email">Email</label>
                <input 
                  className="auth-input"
                  type="email" 
                  id="email" 
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="auth-form-group">
                <label className="auth-label" htmlFor="password">Password</label>
                <input 
                  className="auth-input"
                  type="password" 
                  id="password" 
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required 
                />
              </div>
              <button type="submit" className="auth-button">Login</button>
              <hr className="auth-divider"/>
              <div className="social-login">
                <button 
                  type="button" 
                  className="google-btn" 
                  onClick={() => handleGoogleLogin()}
                  disabled={isGoogleLoading}
                >
                  {isGoogleLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fab fa-google"></i>
                  )}
                </button>
              </div>
              <p className="auth-text">
                Don't have an account? <Link className="auth-link" to="/signup">Register here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="auth-decoration auth-decoration--yellow"></div>
      <div className="auth-decoration auth-decoration--blue"></div>
      <div className="auth-decoration auth-decoration--red"></div>
    </div>
  );
}

export default Login;
