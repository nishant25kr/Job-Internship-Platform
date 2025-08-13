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
        <div className="flex flex-wrap items-center justify-around w-full  ">
            <h1 className="text-4xl">Logo</h1>
            <div>
                {user ? (
                    <Button
                        type="submit"
                        onClick={logoutHandler}
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button
                        t   ype="submit"
                            onClick={LoginClicked}
                            className="m-3"
                        >
                            Login
                        </Button>
                        <Button
                            type="submit"
                            onClick={LoginClicked}
                            className="m-3"
                        >
                            SignUp
                        </Button>
                    </>
                )}
                {/* <ThemeToggler/> */}

            </div>
        </div>
    )
}