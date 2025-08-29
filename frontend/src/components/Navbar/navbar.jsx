import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutStart, logoutSucess } from "../../features/AuthSlice"
import axios from "axios"
import Button from "../Button"
import ThemeToggle from "../ThemeSwitcher"
import { Menu, X, User, ChevronDown, Search, Bell, Briefcase } from "lucide-react"

export default function Navbar() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { theme } = useSelector((state) => state.theme)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
            // setIsScrolled(true)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const LoginClicked = () => navigate("/login")
    const SignupClicked = () => navigate("/signup")

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
                    setIsOpen(false)
                    setShowUserMenu(false)
                    navigate('/')

                }
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    const navLinks = [
        { name: 'Find Jobs', href: '/', icon: Briefcase },
        { name: 'Companies', href: '/companies', icon: User },
        { name: 'Resources', href: '/resources', icon: Search },
    ]

    return (
        <section className={`sticky top-0  z-50 transition-all duration-100 ${isScrolled ? 'backdrop-blur-md bg-opacity-80' : ''
            }`}>
            <div className={`mt-3 ml-3 mr-3 rounded-3xl  ${theme === "dark"
                ? `border-gray-800/50 ${isScrolled ? ' shadow-2xl shadow-purple-500/10 ' : 'border-2 m-0 bg-gray-900/50'}`
                : `border-gray-400/50 ${isScrolled ? ' shadow-2xl shadow-blue-500/10 ' : 'border-2 m-0 bg-white/50'}`
                } backdrop-blur-lg

            `}>

                <nav className="flex items-center justify-between w-full md:px-6 sm:px-2 py-4">

                    {/* Logo Section - Enhanced */}
                    <div className="flex items-center space-x-1 pl-2">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme === 'dark'
                            ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                            : 'bg-gradient-to-br from-purple-500 to-blue-500'
                            } shadow-lg`}>
                            <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <h1 className={`text-2xl md:text-3xl font-black ${theme === "dark"
                            ? "bg-gradient-to-r from-white via-purple-200 to-blue-200"
                            : "bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600"
                            } bg-clip-text text-transparent`}>
                            GetYourJob
                        </h1>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex  items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 ${theme === 'dark'
                                    ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                                    } backdrop-blur-sm`}
                            >
                                <link.icon className="w-4 h-4" />
                                <span className="font-medium">{link.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-3">
                                {/* Notifications */}
                                <button className={`p-3 rounded-full transition-all duration-200 hover:scale-110 ${theme === 'dark'
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                                    } relative`}>
                                    <Bell className="w-5 h-5" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                </button>

                                {/* User Menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className={`flex items-center space-x-3 p-2 rounded-2xl transition-all duration-200 hover:scale-105 ${theme === 'dark'
                                            ? 'hover:bg-gray-800/50 border border-gray-700/50'
                                            : 'hover:bg-gray-100/50 border border-gray-200/50'
                                            } backdrop-blur-sm`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme === 'dark'
                                            ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                                            : 'bg-gradient-to-br from-purple-500 to-blue-500'
                                            } shadow-lg`}>
                                            <span className="text-white font-bold text-sm">
                                                {user.fullname.split(" ")[0]?.charAt(0).toUpperCase() || "U"}
                                                {user.fullname.split(" ")[1]?.charAt(0).toUpperCase() || "U"}

                                            </span>
                                        </div>
                                        <div className="hidden lg:block text-left">
                                            <p className={`text-sm font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"
                                                }`}>
                                                {user.username || "User"}
                                            </p>
                                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                                }`}>
                                                Welcome back!
                                            </p>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''
                                            } ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    </button>

                                    {/* User Dropdown */}
                                    {showUserMenu && (
                                        <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border backdrop-blur-lg z-50 ${theme === 'dark'
                                            ? 'bg-gray-800/90 border-gray-700/50'
                                            : 'bg-white/90 border-gray-200/50'
                                            }`}>
                                            <div className="p-4 border-b border-opacity-20 border-gray-400">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark'
                                                        ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                                                        : 'bg-gradient-to-br from-purple-500 to-blue-500'
                                                        }`}>
                                                        <span className="text-white font-bold">
                                                            {user.fullname.split(" ")[0]?.charAt(0).toUpperCase() || "U"}
                                                            {user.fullname.split(" ")[1]?.charAt(0).toUpperCase() || "U"}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"
                                                            }`}>
                                                            {user.username || "User"}
                                                        </p>
                                                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                                            }`}>
                                                            {user.email || "user@example.com"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2">
                                                <a href="/profile/about" className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${theme === 'dark'
                                                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                                    : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                                                    }`}>
                                                    <User className="w-4 h-4" />
                                                    <span>My Profile</span>
                                                </a>
                                                <a href="/applications" className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${theme === 'dark'
                                                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                                    : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                                                    }`}>
                                                    <Briefcase className="w-4 h-4" />
                                                    <span>My Applications</span>
                                                </a>
                                                <button
                                                    onClick={logoutHandler}
                                                    className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20`}
                                                >
                                                    <span>Sign Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Button
                                    onClick={LoginClicked}
                                    className="border-2 border-transparent hover:border-purple-500/50 backdrop-blur-sm"
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={SignupClicked}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    Sign Up
                                </Button>
                            </div>
                        )}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-1">
                        <ThemeToggle />

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${theme === 'dark'
                                ? 'text-gray-300 hover:bg-gray-800/50'
                                : 'text-gray-600 hover:bg-gray-100/50'
                                }`}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className={`border-t backdrop-blur-lg ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
                        }`}>
                        <div className="px-6 py-4 space-y-4">

                            {/* Mobile Navigation Links */}
                            <div className="space-y-2">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(!isOpen)}
                                        className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${theme === 'dark'
                                            ? 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                                            : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                                            }`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <link.icon className="w-5 h-5" />
                                        <span className="font-medium" >{link.name}</span>
                                    </a>
                                ))}
                            </div>

                            {/* Mobile Auth Section */}
                            {user ? (
                                <div onClick={() => { setIsOpen(!isOpen) }} className="space-y-4 pt-4 border-t border-opacity-20 border-gray-400">
                                    <Link className="flex items-center space-x-3 p-3" to="/profile/about">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark'
                                            ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                                            : 'bg-gradient-to-br from-purple-500 to-blue-500'
                                            }`}>
                                            <Link className="text-white font-bold">
                                                {user.fullname.split(" ")[0]?.charAt(0).toUpperCase() || "U"}
                                                {user.fullname.split(" ")[1]?.charAt(0).toUpperCase() || "U"}
                                            </Link>
                                        </div>
                                        <div>
                                            <p className={`font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"
                                                }`}>
                                                {user.fullname || "User"}
                                            </p>
                                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                                }`}>
                                                Welcome back!
                                            </p>
                                        </div>
                                    </Link>
                                    <Button
                                        onClick={() => {
                                            logoutHandler();
                                            setIsOpen(!isOpen)
                                        }}
                                        className="w-full mx-auto"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3 pt-4 border-t border-opacity-20 border-gray-400">
                                    <Button
                                        onClick={() => {
                                            LoginClicked();
                                            setIsOpen(!isOpen)
                                        }}
                                        className="w-full  mx-auto"
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            SignupClicked();
                                            setIsOpen(!isOpen);
                                        }}
                                        className="w-full  mx-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
