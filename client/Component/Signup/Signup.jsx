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
    <div className='border w-25 mx-auto mt-5 p-3'>
      <form onSubmit={handleSubmit} className='m-2'>
        <h2>Signup Page</h2>
        <input
          type="text"
          name="username"
          className="form-control m-1"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          className="form-control m-1"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          className="form-control m-1"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn m-1 btn-primary">Signup</button>
        <Link to="/login" className="m-1 btn btn-secondary">Login</Link>
      </form>
    </div>
  )
}
