import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import ThemeToggler from "../../components/ui/ThemeToggler"
import { useDispatch, useSelector } from "react-redux"
import store from "../../app/store"
import { logout } from "../../features/AuthSlice"
import axios from "axios"
import Button from "../Button"


export default function Navbar() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const LoginClicked = () => {
        navigate('/login')
    }

    const logoutHandler = () => {
        axios
            .post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
            .then((response) => {
                if (response.data.success) {
                    dispatch(logout())
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }

    return (
        <div className="flex items-center justify-between w-full px-6 py-4 backdrop-blur-md ">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-gray-600 bg-clip-text text-transparent">
                    JobPortal
                </h1>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-3">
                {user ? (
                    <div className="flex items-center space-x-4">
                        {/* User Info */}
                        <div className="hidden md:flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                    {user ? user.username.charAt(0).toUpperCase() : 'U'}
                                </span>
                            </div>
                            <div className="hidden lg:block">
                                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                                <p className="text-xs text-gray-500">{user.username || 'User'}</p>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <Button
                            type="button"
                            onClick={logoutHandler}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-3">
                        <Button
                            type="button"
                            onClick={LoginClicked}
                        >
                            Login
                        </Button>
                        <Button
                            type="button"
                            onClick={LoginClicked} // Fixed: should be different from LoginClicked
                        >
                            Sign Up
                        </Button>
                    </div>
                )}
            </div>
        </div>

    )
}