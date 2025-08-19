import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutStart, logoutSucess } from "../../features/AuthSlice"
import axios from "axios"
import Button from "../Button"
import ThemeToggle from "../ThemeSwitcher"
import { Menu, X } from "lucide-react" // hamburger & close icons

export default function Navbar() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { theme } = useSelector((state) => state.theme)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const LoginClicked = () => navigate("/login")

    const logoutHandler = () => {
        dispatch(logoutStart())
        axios
            .post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
                {},
                { withCredentials: true }
            )
            .then((response) => {
                if (response.data.success) {
                    dispatch(logoutSucess())
                    setIsOpen(false) // close menu after logout
                }
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    return (
        <section 
        className = {`border-2 m-3 
         rounded-3xl
        ${theme === "dark"
                        ? "border-gray-700"
                        : "border-gray-300"
                        }
        `}
        
        >

            <nav
                className={`flex items-center justify-between w-full px-6 py-4`}
            >
                {/* Logo Section */}
                <h1
                    className={`text-2xl md:text-3xl font-bold ${theme === "dark"
                        ? "bg-gradient-to-r from-slate-500 to-gray-300"
                        : "bg-gradient-to-r from-slate-800 to-gray-600"
                        } bg-clip-text text-transparent`}
                >
                    GetYourJob
                </h1>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-5">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-3">
                                <div className={`w-12 h-12 
                                    ${theme === 'light'
                                        ? 'bg-gradient-to-r from-slate-300 via-purple-300 to-indigo-300 hover:from-slate-400 hover:via-purple-400 hover:to-indigo-400 text-gray-800 border-gray-300/50 hover:shadow-purple-200/25'
                                        : 'bg-gradient-to-r from-slate-800 via-purple-900 to-indigo-900 hover:from-slate-800 hover:via-purple-800 hover:to-indigo-800 text-white border-white/20 hover:shadow-purple-500/25'
                                    }
                                    rounded-full flex items-center justify-center`}>
                                    <span className="text-white font-semibold text-sm">
                                        {user.username?.charAt(0).toUpperCase() || "U"}
                                    </span>
                                </div>
                                <div className="hidden lg:block">
                                    <p className={`text-s ${theme === "dark" ? "text-gray-200" : "text-gray-600"} `}>
                                        Welcome back!
                                    </p>
                                    <p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-500"} `}>
                                        {user.username || "User"}
                                    </p>
                                </div>
                            </div>
                            <Button onClick={logoutHandler}>Logout</Button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Button onClick={LoginClicked}>Login</Button>
                            <Button onClick={LoginClicked}>Sign Up</Button>
                        </div>
                    )}
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg flex flex-col items-center space-y-4 py-6 md:hidden z-50">
                        {user ? (
                            <>
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="w-12 h-12 bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold text-lg">
                                            {user.username?.charAt(0).toUpperCase() || "U"}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-200">
                                        {user.username || "User"}
                                    </p>
                                </div>
                                <Button onClick={logoutHandler}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={LoginClicked}>Login</Button>
                                <Button onClick={LoginClicked}>Sign Up</Button>
                            </>
                        )}
                        <ThemeToggle />
                    </div>
                )}
            </nav>
        </section>
    )
}
