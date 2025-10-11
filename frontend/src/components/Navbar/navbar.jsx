import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutStart, logoutSucess } from "../../features/AuthSlice"
import { companylogoutStart, companylogoutSuccess } from "../../features/CompanyAuthSlice"

import axios from "axios"
import Button from "../Button"
import ThemeToggle from "../ThemeSwitcher"
import { Menu, X, User, ChevronDown, Search, Bell, Briefcase, LogOut } from "lucide-react"

export default function Navbar() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { company } = useSelector((state) => state.companyauth)
    const { theme } = useSelector((state) => state.theme)
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)

    const navigate = useNavigate()

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu and dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar-container')) {
                setIsOpen(false)
                setShowUserMenu(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    const LoginClicked = () => navigate("/login")
    const GiveJobClicket = () => navigate("/CompanyLogin-signup")

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
                    window.scrollTo(0, 0);
                }
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    const companyLogoutHandler = () => {
        console.log("from com")
        dispatch(companylogoutStart())
        axios
            .post(
                `${import.meta.env.VITE_BACKEND_URL}/api/company/logout`,
                {},
                { withCredentials: true }
            )
            .then((response) => {
                if (response.data.success) {
                    dispatch(companylogoutSuccess())
                    navigate('/')
                    window.scrollTo(0, 0);
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

    const cardClasses = theme === 'dark'
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 hover:border-blue-500/30 hover:shadow-blue-500/10'
        : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-blue-100';


    return (
        <section className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-opacity-80' : ''
            }`}>

            <div className={`
                transition-all duration-500 ease-in-out
                ${isScrolled ?
                    'navbar-container shadow-2xl mx-0 sm:mx-0 mt-0 sm:mt-0 rounded-0xl sm:rounded-0xl'
                    : `bg-gray-900/70 border ${cardClasses} navbar-container mx-2 sm:mx-3 mt-2 sm:mt-3 rounded-2xl sm:rounded-3xl`}
            `}>

                <nav className="flex items-center justify-between w-full px-3 sm:px-4 md:px-6 py-3 sm:py-4">

                    <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${theme === 'dark'
                            ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                            : 'bg-gradient-to-br from-purple-500 to-blue-500'
                            } shadow-lg`}>
                            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <h1 className={`text-lg sm:text-2xl md:text-3xl font-black truncate max-w-[120px] sm:max-w-none ${theme === "dark"
                            ? "bg-gradient-to-r from-white via-purple-200 to-blue-200"
                            : "bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600"
                            } bg-clip-text text-transparent`}>
                            GetYourJob
                        </h1>
                    </div>

                    {/* Desktop Navigation Links - Hidden on smaller screens */}
                    <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 ${theme === 'dark'
                                    ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                                    } backdrop-blur-sm`}
                            >
                                <link.icon className="w-4 h-4" />
                                <span className="font-medium">{link.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Desktop Auth Section - Responsive breakpoints */}
                    <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-2 lg:space-x-3">
                                {/* Notifications - Hidden on smaller screens */}
                                <button className={`hidden md:flex p-2 lg:p-3 rounded-full transition-all duration-200 hover:scale-110 ${theme === 'dark'
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                                    } relative`}>
                                    <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                                    <div className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full animate-pulse"></div>
                                </button>

                                {/* User Menu - More responsive */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className={`flex items-center space-x-2 lg:space-x-3 p-1.5 lg:p-2 rounded-xl lg:rounded-2xl transition-all duration-200 hover:scale-105 ${theme === 'dark'
                                            ? 'hover:bg-gray-800/50 border border-gray-700/50'
                                            : 'hover:bg-gray-100/50 border border-gray-200/50'
                                            } backdrop-blur-sm`}
                                    >
                                        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center ${theme === 'dark'
                                            ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                                            : 'bg-gradient-to-br from-purple-500 to-blue-500'
                                            } shadow-lg`}>
                                            <span className="text-white font-bold text-xs lg:text-sm">
                                                {user.fullname.split(" ")[0]?.charAt(0).toUpperCase() || "U"}
                                                {user.fullname.split(" ")[1]?.charAt(0).toUpperCase() || ""}
                                            </span>
                                        </div>
                                        {/* User info - Hidden on medium screens, shown on large */}
                                        <div className="hidden xl:block text-left">
                                            <p className={`text-sm font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"
                                                }`}>
                                                {user.username || "User"}
                                            </p>
                                            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                                }`}>
                                                Welcome back!
                                            </p>
                                        </div>
                                        <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''
                                            } ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    </button>

                                    {/* User Dropdown - More responsive */}
                                    {showUserMenu && (
                                        <div className={`absolute right-0 mt-2 w-56 lg:w-64 rounded-2xl shadow-2xl border backdrop-blur-lg z-50 ${theme === 'dark'
                                            ? 'bg-gray-800/95 border-gray-700/50'
                                            : 'bg-white/95 border-gray-200/50'
                                            }`}>
                                            <div className="p-3 lg:p-4 border-b border-opacity-20 border-gray-400">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center ${theme === 'dark'
                                                        ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                                                        : 'bg-gradient-to-br from-purple-500 to-blue-500'
                                                        }`}>
                                                        <span className="text-white font-bold text-sm">
                                                            {user.fullname.split(" ")[0]?.charAt(0).toUpperCase() || "U"}
                                                            {user.fullname.split(" ")[1]?.charAt(0).toUpperCase() || ""}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`font-semibold text-sm lg:text-base truncate ${theme === "dark" ? "text-white" : "text-gray-900"
                                                            }`}>
                                                            {user.username || "User"}
                                                        </p>
                                                        <p className={`text-xs lg:text-sm truncate ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                                            }`}>
                                                            {user.email || "user@example.com"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2">

                                                <a href="/profile/about" className={`flex items-center space-x-3 w-full p-2.5 lg:p-3 rounded-lg transition-colors ${theme === 'dark'
                                                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                                    : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                                                    }`}>
                                                    <User className="w-4 h-4" />
                                                    <span>My Profile</span>
                                                </a>

                                                <a href="/applications" className={`flex items-center space-x-3 w-full p-2.5 lg:p-3 rounded-lg transition-colors ${theme === 'dark'
                                                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                                    : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                                                    }`}>
                                                    <Briefcase className="w-4 h-4" />
                                                    <span>My Applications</span>
                                                </a>

                                                <Button
                                                    onClick={logoutHandler}

                                                >
                                                    <LogOut className="w-4 h-4 " />
                                                    <span>Sign Out</span>
                                                </Button>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : company ? (
                            <div className="flex items-center space-x-2 lg:space-x-3">
                                <div className={`flex items-center space-x-2 lg:space-x-3 p-1.5 lg:p-2 rounded-xl lg:rounded-2xl transition-all duration-200 hover:scale-105 ${theme === 'dark'
                                    ? 'hover:bg-gray-800/50 border border-gray-700/50'
                                    : 'hover:bg-gray-100/50 border border-gray-200/50'
                                    } backdrop-blur-sm`}>
                                    <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center ${theme === 'dark'
                                        ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                                        : 'bg-gradient-to-br from-purple-500 to-blue-500'
                                        } shadow-lg`}>
                                        <span className="text-white font-bold text-xs lg:text-sm">
                                            {company.name.split(" ")[0]?.charAt(0).toUpperCase() || "C"}
                                        </span>
                                    </div>
                                    <div className="hidden lg:block text-left">
                                        <p className={`text-sm font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"
                                            }`}>
                                            {company.name || "Company"}
                                        </p>
                                        <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                            }`}>
                                            Welcome back!
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    onClick={companyLogoutHandler}
                                    className="text-xs lg:text-sm px-2 lg:px-4 py-1.5 lg:py-2"
                                >
                                    <LogOut className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                                    <span className="hidden md:inline">Sign Out</span>
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 lg:space-x-3">
                                <Button
                                    onClick={LoginClicked}
                                    className="text-xs lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2 border-transparent hover:border-purple-500/50 backdrop-blur-sm"
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={GiveJobClicket}
                                    className="text-xs lg:text-sm px-3 lg:px-4 py-1.5 lg:py-2"
                                >
                                    GiveJob
                                </Button>
                            </div>
                        )}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Section */}
                    <div className="flex sm:hidden items-center space-x-2">
                        <ThemeToggle />
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsOpen(!isOpen)
                            }}
                            className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${theme === 'dark'
                                ? 'text-gray-300 hover:bg-gray-800/50'
                                : 'text-gray-600 hover:bg-gray-100/50'
                                }`}
                            aria-label="Toggle mobile menu"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu - Enhanced responsiveness */}
                <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className={`border-t backdrop-blur-lg ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
                        }`}>
                        <div className="px-4 py-4 space-y-4">

                            {/* Mobile Navigation Links */}
                            <div className="space-y-2">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-105 ${theme === 'dark'
                                            ? 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                                            : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                                            }`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <link.icon className="w-5 h-5" />
                                        <span className="font-medium">{link.name}</span>
                                    </a>
                                ))}
                            </div>

                            {/* Mobile Auth Section */}
                            {user ? (
                                <div className="space-y-4 pt-4 border-t border-opacity-20 border-gray-400">
                                    <Link
                                        className="flex items-center space-x-3 p-3"
                                        to="/profile/about"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark'
                                            ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                                            : 'bg-gradient-to-br from-purple-500 to-blue-500'
                                            }`}>
                                            <span className="text-white font-bold">
                                                {user.fullname.split(" ")[0]?.charAt(0).toUpperCase() || "U"}
                                                {user.fullname.split(" ")[1]?.charAt(0).toUpperCase() || ""}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-semibold truncate ${theme === "dark" ? "text-gray-200" : "text-gray-700"
                                                }`}>
                                                {user.fullname || "User"}
                                            </p>
                                            <p className={`text-sm truncate ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                                }`}>
                                                Welcome back!
                                            </p>
                                        </div>
                                    </Link>
                                    <Button
                                        onClick={() => {
                                            logoutHandler();
                                            setIsOpen(false)
                                        }}
                                        className="w-full"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </Button>
                                </div>
                            ) : company ? (
                                <div className="space-y-4 pt-4 border-t border-opacity-20 border-gray-400">
                                    <div className="flex items-center space-x-3 p-3">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark'
                                            ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                                            : 'bg-gradient-to-br from-purple-500 to-blue-500'
                                            }`}>
                                            <span className="text-white font-bold">
                                                {company.name.split(" ")[0]?.charAt(0).toUpperCase() || "C"}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-semibold truncate ${theme === "dark" ? "text-gray-200" : "text-gray-700"
                                                }`}>
                                                {company.name || "Company"}
                                            </p>
                                            <p className={`text-sm truncate ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                                }`}>
                                                Welcome back!
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            companyLogoutHandler();
                                            setIsOpen(false)
                                        }}
                                        className="w-full"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3 pt-4 border-t border-opacity-20 border-gray-400">
                                    <Button
                                        onClick={() => {
                                            LoginClicked();
                                            setIsOpen(false)
                                        }}
                                        className="w-full"
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            GiveJobClicket();
                                            setIsOpen(false);
                                        }}
                                        className=""
                                    >
                                        Give Job
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
