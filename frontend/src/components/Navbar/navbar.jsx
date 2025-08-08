import React, { useContext, useState } from "react"
import AuthContext from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import ThemeToggler from "../../components/ui/ThemeToggler"

export default function Navbar() {
    const { user, Logout } = useContext(AuthContext)
    const [mobileOpen, setmobileOpen] = useState(false)
    const navigate = useNavigate()

    const LoginClicked = () => {
        navigate('/login')
    }


    return (
        <div className="flex flex-wrap items-center justify-around w-full  ">
            <h1 className="text-4xl">Logo</h1>
            <div>
                {user ? (

                    <button
                        className="px-4 py-2 mx-4 my-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={Logout}
                    >Logout</button>
                ) : (
                    <>
                        <button
                            className="px-4 py-2 mx-4 my-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            onClick={LoginClicked}>Login</button>
                        <button
                            className="px-4 py-2 mx-4 my-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"

                        >SignUp</button>
                    </>
                )}
                {/* <ThemeToggler/> */}

            </div>
        </div>
    )
}