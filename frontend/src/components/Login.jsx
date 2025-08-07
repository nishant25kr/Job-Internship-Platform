import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


export default function Login() {
    const [email, setEmail] = useState("two@gmail.com")
    const [password, setPassword] = useState("two@123456")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);

        axios
            .post("http://localhost:8000/api/users/login", { email, password }, {
                withCredentials: true,
            })
            .then((response) => {

                if (response.data.success) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.data.LoggedInUser)
                    );
                    navigate("/");
                } else {
                    alert("Invalid credentials");
                }
            })
            .catch((error) => {
                console.log("Error", error.message);
            });
    };


    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <button type="submit" className="border">Login</button>
            </form>
        </div>
    )
}

