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
    <div className="flex items-center min-h-[90vh] max-h-screen bg-gray-50">
      {/* Left Side - Image/Content Section */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-1/2 h-[90vh] bg-white items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>

        {/* Content Container */}
        <div className="relative z-10 text-center px-12 max-w-lg">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Welcome Text */}
          <h1 className="text-4xl xl:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Sign in to access your account and continue your journey with us
          </p>

          {/* Features List */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Fast & Reliable</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-gray-700">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-gray-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-gray-200 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 right-20 w-4 h-4 bg-purple-300 rounded-full opacity-60"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-1/2 h-[90vh] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Additional Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 mt-8">
            Don't have an account?{' '}
            <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>

  );
}
