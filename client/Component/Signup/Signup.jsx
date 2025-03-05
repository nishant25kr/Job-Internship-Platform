
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

export default function Signup() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", { username, email, password })
      .then((result) => {
        console.log(result);
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className='text-light'>Create an Account</h2>
        <p>Join us and explore amazing features</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="username"
            className="signup-input"
            placeholder="Enter your username"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            name="email"
            className="signup-input"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            className="signup-input"
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="login-text">
          Already have an account? <Link to='/login' className='login-link'>Login here</Link>
        </p>
      </div>
    </div>
  );
}
