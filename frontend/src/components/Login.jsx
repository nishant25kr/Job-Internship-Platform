import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../features/AuthSlice";
import axios from "axios";
import { useNavigate, Link, isSession } from "react-router-dom";
import Input from "./Inputt";
import Button from "./Button";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export default function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const { theme } = useSelector((state) => state.theme);
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(loginStart());
    setErrors({});

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        const userOb = response.data.data.LoggedInUser;
        dispatch(loginSuccess({
          user: userOb,
          rememberMe,
        }));
        navigate('/');
      } else {
        dispatch(loginFailure("Invalid credentials"));
        setErrors({ submit: "Invalid credentials" });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      dispatch(loginFailure(errorMessage));
      setErrors({ submit: errorMessage });
    }
  };

  const handleGoogleLogin = (e) => {
    console.log(e)
    if (!e) {
      alert("please provide required data for google login")
    }
    const userId = e.userId;
    const email = e.email;
    const name = e.name;
    const profilePhoto = e.profilePhoto;
    dispatch(loginStart());
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/oauth-login`,
        { userId, email, name, profilePhoto },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success) {
          const userOb = response.data.data.LoggedInUser;
          dispatch(loginSuccess({
            user: userOb,
            rememberMe,
          }));
          navigate('/')
        } else {
          dispatch(loginFailure("Invalid credentials"));
          setErrors({ submit: "Invalid credentials" });
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
        dispatch(loginFailure(errorMessage));
        setErrors({ submit: errorMessage });
      })
  }

  // Theme-based classes
  const themeClasses = {
    text: {
      primary: theme === "light" ? "text-gray-800" : "text-gray-200",
      secondary: theme === "light" ? "text-gray-600" : "text-gray-300",
      muted: theme === "light" ? "text-gray-500" : "text-gray-400",
    },
    leftSection: theme === "light" ? "bg-gradient-to-b from-white via-gray-200 via-gray-200 via-gray-200 to-white" : "bg-gradient-to-b from-black via-gray-800 via-gray-600 via-gray-800 to-black",
    card: theme === "light" ? "bg-white" : "bg-gray-800",
  };

  return (
    <div className={`flex items-center min-h-[100vh]
       rounded-3xl max-h-screen 
     ${theme === "dark"
        ? "border-gray-700"
        : "border-gray-300"
      }
      ${themeClasses.background}`}>
      {/* Left Side - Image/Content Section */}
      <div className={`hidden lg:flex lg:w-1/2 xl:w-1/2 h-full items-center justify-center relative overflow-hidden ${themeClasses.leftSection}`}>


        {/* Content Container */}
        <div className="relative z-10 text-center px-12 max-w-lg">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className={`w-24 h-24 mx-auto bg-gradient-to-r
            ${theme === 'light'
                ? 'bg-gradient-to-r from-slate-500 via-purple-500 to-indigo-500 hover:from-slate-400 border-gray-300/50 '
                : 'bg-gradient-to-r from-slate-800 via-purple-900 to-indigo-900  text-white border-white/20 hover:shadow-purple-500/25'
              }
             rounded-2xl flex items-center justify-center shadow-xl`}>
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Welcome Text */}
          <h1 className={`text-4xl xl:text-5xl font-bold mb-6 leading-tight
            
            `}>
            Welcome Back
          </h1>
          <p className={`text-xl ${themeClasses.text.secondary} leading-relaxed mb-8`}>
            Sign in to access your account and continue your journey with us
          </p>

          {/* Features List */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className={themeClasses.text.secondary}>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className={themeClasses.text.secondary}>Fast & Reliable</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className={themeClasses.text.secondary}>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-1/2 h-full flex items-center justify-center p-8">
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
            <h2 className={`text-3xl font-bold ${themeClasses.text.primary} mb-2`}>
              Sign In
            </h2>
            <p className={themeClasses.text.secondary}>
              Enter your credentials to access your account
            </p>
            <GoogleLogin
              onSuccess={credentialResponse => {
                const token = credentialResponse.credential;
                const userInfo = jwtDecode(token);
                console.log("User Info:", userInfo);
                const data = {
                  userId: token,
                  email: userInfo.email,
                  name: userInfo.name,
                  profilePhoto: userInfo.picture
                }
                handleGoogleLogin(data)

              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <Button onClick={() => { googleLogout() }} >
              logout
            </Button>


          </div>
          <div>

          </div>

          {/* Error Display */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}>
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border ${errors.email
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'
                  }`}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${themeClasses.text.secondary} mb-2`}>
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border ${errors.password
                  ? 'border-red-300 dark:border-red-600'
                  : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'
                  }`}
                required
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Additional Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 dark:border-gray-600 rounded focus:ring-purple-500 dark:bg-gray-700"
                />
                <span className={`ml-2 ${themeClasses.text.muted}`}>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <p className={`text-center ${themeClasses.text.muted} mt-8`}>
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
