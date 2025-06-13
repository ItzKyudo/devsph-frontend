import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../css/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confpassword: string;
}

function RegistrationForm()  {
    const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confpassword: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e: FormEvent) => {
  e.preventDefault();

  axios.post("http://localhost:5173/create", formData)
      .then(function(response) {
        if (response.data && response.data.success) {
          alert(response.data.success);
          navigate('/'); // Navigate only after success
        } else if (response.data && response.data.error) {
          alert("Error: " + response.data.error);
        } else {
          alert("Unexpected response: " + JSON.stringify(response.data));
        }
      })
      .catch(function(error) {
        if (error.response) {
          alert("Server Error: " + (error.response.data?.error || error.message));
        } else if (error.request) {
          alert("No response from server. Please check your connection.");
        } else {
          alert("Error: " + error.message);
        }
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
        <h2 className="formTitle"> CREATE AN ACCOUNT </h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="firstname">First Name</label>
            <input 
              type="text" 
              id="firstname" 
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="formGroup">
            <label htmlFor="lastname">Last Name</label>
            <input 
              type="text" 
              id="lastname" 
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="formGroup">
            <label htmlFor="confpassword">Confirm Password</label>
            <input 
              type="password" 
              id="confpassword" 
              name="confpassword"
              value={formData.confpassword}
              onChange={handleChange}
              required 
            />
          </div>
          <button type="submit" className="contact-btn">Sign Up</button>
          <hr/>
          <p className="bottomTxt">Already Have an Account? Login <Link to="/signin">here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
