import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:3000/login", { email, password })
//       .then(result => {
//         console.log(result);
//         if (result.data.status === "success") {  
//           localStorage.setItem("user", JSON.stringify({ 
//             id: result.data.id, 
//             username: result.data.username 
//           }));
//           // setOnLoggedIn(true); 
//           navigate('/jobs');
//         } else {
//           alert("Invalid credentials!");
//         }
//       })
//       .catch((err) => console.log(err));
// };

const handleSubmit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:3000/login", { email, password })
    .then(result => {
      console.log("Login Response:", result.data);
      
      if (result.data.status === "success") {  // FIXED: Check correct response key
        localStorage.setItem("user", JSON.stringify({ id: result.data.id, username: result.data.username }));
        navigate('/');  // Navigate after successful login
        window.location.reload();  // Force navbar to update
      } else {
        alert("Invalid credentials!");
      }
    })
    .catch(err => console.log("Login Error:", err));
};

  return (
    <div>
      <div className='border w-25 mx-auto mt-5 p-3'>
        <form onSubmit={handleSubmit} className='m-2'>
          <h2>Login Page</h2>

          <input
            type="email"
            name='email'
            className='m-1 form-control'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> <br />

          <input
            type="password"
            name='password'
            className='m-1 form-control'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> <br />

          <input type="submit" value='Login' className='btn m-1 btn-primary' />
          <Link to='/register' className='m-1 btn btn-secondary'>New User</Link>

        </form>
      </div>
    </div>
  );
}
