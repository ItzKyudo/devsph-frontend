import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../css/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

/* For Maintenance */
const urlProcessors = "http://localhost:8000";

interface LoginData {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    axios.post(urlProcessors + "/login", loginData).then(response => {
      if (response.data.success) {
        navigate('/'); // Redirect to dashboard or home page
      } else {
        alert("Login Failed: " + response.data.message);
      }
    }).catch(error => {
      alert("An error occurred: " + error.message);
    });
  };

  return (
    <div className="container">
      <div className="formCard">
        <img rel="icon" src="/icon.png" />
        <h2 className="formTitle">
          DEVS <span className="light-red">P</span><span className="light-blue">H</span>
        </h2>
        <hr/>
        <h2 className="formTitle"> Login </h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <button type="submit" className="contact-btn">Login</button>
          <hr/>
          <p className="bottomTxt">Don't have an account? Register <Link to="/signup">here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
