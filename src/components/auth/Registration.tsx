import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../css/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const API_URL = "http://localhost:8000";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confpassword: string;
}

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confpassword: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confpassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      await Swal.fire({
        icon: 'success',
        title: 'Account Created!',
        text: 'Welcome to DEVS PH! Your account has been successfully created.',
        confirmButtonColor: '#0038A8',
        background: '#fff',
        color: '#1E293B',
        iconColor: '#FCD116'
      });
      
      navigate('/');
    } catch (error) {
      setError("An error occurred during registration.");
    }
  };

  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );
        const nameParts = userInfo.data.name.split(' ');
        const firstname = nameParts[0];
        const lastname = nameParts.slice(1).join(' ');
        const signUpResponse = await axios.post(`${API_URL}/google-signup`, {
          email: userInfo.data.email,
          firstname,
          lastname,
          googleId: userInfo.data.sub
        });

        if (signUpResponse.data.success) {
          await Swal.fire({
            icon: 'success',
            title: 'Account Created!',
            text: 'Welcome to DEVS PH! Your account has been successfully created.',
            confirmButtonColor: '#0038A8',
            background: '#fff',
            color: '#1E293B',
            iconColor: '#FCD116'
          });
          navigate('/');
        } else {
          alert("Google Sign Up Failed: " + signUpResponse.data.message);
        }
      } catch (error) {
        alert("An error occurred during Google sign up: " + (error instanceof Error ? error.message : 'Unknown error'));
      }
    },
    onError: () => {
      alert('Google Sign Up Failed');
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
            <hr className="auth-divider" />
            <h2 className="auth-title">CREATE AN ACCOUNT</h2>
            <form onSubmit={handleSubmit}>
              <div className="auth-form-group">
                <label className="auth-label" htmlFor="firstname">First Name</label>
                <input 
                  className="auth-input"
                  type="text" 
                  id="firstname" 
                  name="firstname" 
                  value={formData.firstname} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="auth-form-group">
                <label className="auth-label" htmlFor="lastname">Last Name</label>
                <input 
                  className="auth-input"
                  type="text" 
                  id="lastname" 
                  name="lastname" 
                  value={formData.lastname} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="auth-form-group">
                <label className="auth-label" htmlFor="email">Email</label>
                <input 
                  className="auth-input"
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
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
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="auth-form-group">
                <label className="auth-label" htmlFor="confpassword">Confirm Password</label>
                <input 
                  className="auth-input"
                  type="password" 
                  id="confpassword" 
                  name="confpassword" 
                  value={formData.confpassword} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <button type="submit" className="auth-button">Sign Up</button>
              <hr className="auth-divider" />
              <div className="social-login">
                <button type="button" className="google-btn" onClick={() => handleGoogleSignUp()}>
                  <i className="fa-brands fa-google"></i>
                </button>
              </div>
              <p className="auth-text">
                Already Have an Account? <Link className="auth-link" to="/signin">Login here</Link>
              </p>

              {error && (
                <p className="auth-error">{error}</p>
              )}
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

export default Registration;
