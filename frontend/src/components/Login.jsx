import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../features/AuthSlice"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "./Inputt";
import Button from "./Button";

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
        
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <Input

              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <Input

              id="Password"
              type="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

          </div>

          <Button
            type="submit"
            className="w-full "
          >Submit</Button>

        </form>
      </div>
    </div>
  );
}
