import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import ThemeToggler from "../../components/ui/ThemeToggler"
import { useDispatch, useSelector } from "react-redux"
import store from "../../app/store"
import { logout } from "../../features/AuthSlice"
import axios from "axios"


export default function Navbar() {
    const dispatch = useDispatch()
    const {user} = useSelector( (state)=> state.auth)
    const navigate = useNavigate()

    const LoginClicked = () => {
        navigate('/login')
    }

    const logoutHandler=()=>{
        axios
            .post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
            .then((response) => {
                if(response.data.success){
                    dispatch(logout())
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        
    }

    return (
        <div className="flex flex-wrap items-center justify-around w-full  ">
            <h1 className="text-4xl">Logo</h1>
            <div>
                {user ? (

                    <button
                        className="px-4 py-2 mx-4 my-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={logoutHandler}
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