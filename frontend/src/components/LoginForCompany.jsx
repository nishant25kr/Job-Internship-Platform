import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { companyloginStart, companyloginSuccess, companyloginFailure } from "../features/CompanyAuthSlice.js";
import axios from "axios";
import { useNavigate, Link, isSession } from "react-router-dom";
import Input from "./Inputt";
import Button from "./Button";
import { jwtDecode } from "jwt-decode";


function LoginForCompany() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const { theme } = useSelector((state) => state.theme);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const themeClasses = {
        text: {
            primary: theme === "light" ? "text-gray-800" : "text-gray-200",
            secondary: theme === "light" ? "text-gray-600" : "text-gray-300",
            muted: theme === "light" ? "text-gray-500" : "text-gray-400",
        },
        leftSection: theme === "light" ? "bg-gradient-to-b from-white via-gray-200 via-gray-200 via-gray-200 to-white" : "bg-gradient-to-b from-black via-gray-800 via-gray-600 via-gray-800 to-black",
        card: theme === "light" ? "bg-white" : "bg-gray-800",
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(companyloginStart());
        setErrors({});

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/company/login`,
            { email, password },
            { withCredentials: true }
        )
            .then((response) => {
                // console.log(response.data.data)
                console.log(response)
                if (response.data.success) {
                    const userOb = response.data.data;
                    dispatch(companyloginSuccess({
                        company: userOb,
                    }));
                    navigate("/company")
                    window.scrollTo(0, 0);
                } else {
                    dispatch(companyloginFailure("Invalid credentials"));
                    setErrors({ submit: "Invalid credentials" });
                }
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
                dispatch(companyloginFailure(errorMessage));
                setErrors({ submit: errorMessage });
            })

    }

    return (
        <div className='h-[90vh]'>
            <div className="w-full lg:w-1/2 xl:w-1/2 h-full mx-auto my-auto flex items-center justify-center p-8">
                <div className="w-full max-w-md">

                    {/* Form Header */}
                    <div className="text-center mb-8">
                        <h2 className={`text-3xl font-bold ${themeClasses.text.primary} mb-2`}>
                            Sign In as Admin
                        </h2>
                        <p className={themeClasses.text.secondary}>
                            Enter your credentials to access your account
                        </p>

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
                            <Link to="/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium">
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            // disabled={loading}
                            className="w-full mx-auto"

                        >
                            signIn
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
    )
}

export default LoginForCompany
