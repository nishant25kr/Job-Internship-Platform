import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../features/AuthSlice"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart());

    axios
      .post("http://localhost:8000/api/users/login", { email, password }, {
        withCredentials: true
      })
      .then((response) => {
        if (response.data.success) {
          const userOb = response.data.data.LoggedInUser
          navigate('/')
          dispatch(
            loginSuccess({
              user: userOb,
              rememberMe: true,
            })
          );
          navigate('/')
        } else {
          dispatch(loginFailure("Invalid user"));
          alert("Invalid user");
        }
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };


  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-sm p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {user ? (<h1>user available{user.username}</h1>) : (<h1>user not available</h1>)}
        {loading ? (<p>true</p>) : (<p>false</p>)}

        {<h1>error:{error}</h1>}


        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <input type="email" onChange={(e) => { setEmail(e.target.value) }} />
          </div>

          <div className="mb-4">
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
