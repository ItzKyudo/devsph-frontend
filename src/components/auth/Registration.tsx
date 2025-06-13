import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../css/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const urlProcessors = "http://localhost:8000";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confpassword: string;
}

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confpassword: ''
  });

  const [error, setError] = useState<string | null>(null); // 👈 Error message state

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null); // Clear error when user types
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    axios.post(urlProcessors + "/create", formData)
      .then((response) => {
        if (response.data?.success) {
          navigate('/');
        } else if (response.data?.error) {
          setError(response.data.error); // 👈 Set error here
        } else {
          setError("Unexpected server response.");
        }
      })
      .catch((error) => {
        if (error.response?.data?.error) {
          setError(error.response.data.error); // 👈 Set API error
        } else {
          setError("Server error. Please try again later.");
        }
      });
  };

  return (
    <div className="container">
      <div className="formCard">
        <img rel="icon" src="/icon.png" alt="logo" />
        <h2 className="formTitle">
          DEVS <span className="light-red">P</span><span className="light-blue">H</span>
        </h2>
        <hr />
        <h2 className="formTitle"> CREATE AN ACCOUNT </h2>
        <form onSubmit={handleSubmit}>
          {/* All Input Fields */}
          {/* ...same code as before... */}

          <div className="formGroup">
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="formGroup">
            <label htmlFor="confpassword">Confirm Password</label>
            <input type="password" id="confpassword" name="confpassword" value={formData.confpassword} onChange={handleChange} required />
          </div>

          <button type="submit" className="contact-btn">Sign Up</button>
          <hr />
          <p className="bottomTxt">Already Have an Account? Login <Link to="/signin">here</Link></p>

          {error && (
            <p className="error-message">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
