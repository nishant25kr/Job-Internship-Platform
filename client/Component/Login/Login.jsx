import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/login", { email, password })
      .then(result => {
        console.log("Login Response:", result.data);
        if (result.data.status === "success") {  
          localStorage.setItem("user", JSON.stringify({ id: result.data.id, username: result.data.username }));
          navigate('/');
          window.location.reload();
        } else {
          alert("Invalid credentials!");
        }
      })
      .catch(err => console.log("Login Error:", err));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className='text-light'>Welcome Back</h2>
        <p>Login to access your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name='email'
            className='login-input'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            name='password'
            className='login-input'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="register-text">
          New here? <Link to='/register' className='register-link'>Create an account</Link>
        </p>
      </div>
    </div>
  );
}
