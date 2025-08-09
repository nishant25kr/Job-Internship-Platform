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
        axios.post(
            "http://localhost:8000/api/users/login",
            { email, password },
            { withCredentials: true }
        )
            .then((response) => {
                if (response.data.success) {
                    const loggedInUser = {
                        name: response.data.data.LoggedInUser.fullname,
                        username: response.data.data.LoggedInUser.username,
                        email: response.data.data.LoggedInUser.email,
                    };
                    localStorage.setItem("user", JSON.stringify(loggedInUser));
                    setUser(loggedInUser);
                    navigate('/');
                } else {
                    alert("Invalid credentials!");
                }
            })
            .catch((err) => {
                console.log(err)
            })
    };

    const Logout = async () => {
        axios
            .post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
            .then((response) => {
                localStorage.removeItem("user");
                setUser(null);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        // console.log(storedUser)
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
