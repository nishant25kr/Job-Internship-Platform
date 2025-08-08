import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        const htmlEl = document.documentElement;
        htmlEl.classList.remove("light", "dark");
        htmlEl.classList.add(theme);
    }, [theme]);


    const Login = async ({ email, password }) => {
        console.log(email, password)
        try {
            const response = axios.post("http://localhost:3000/login", {
                email,
                password
            });
            console.log(response)
            if (response.data.success === "success") {
                const loggedInUser = {
                    name: response.data.data.LoggedInUser.name,
                    username: response.data.data.LoggedInUser.username,
                    email: response.data.data.LoggedInUser.email,
                };

                localStorage.setItem("user", JSON.stringify(loggedInUser));
                setUser(loggedInUser);
                navigate('/');
            } else {
                alert("Invalid credentials!");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const Logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            console.log("User not logged in");
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, Login, Logout, theme, setTheme }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
