import { useSelector } from "react-redux";
import NavigationMenu from "./NavigationMenu";
import { Link, Outlet } from "react-router-dom";
import EmptyState from "../EmptyState";

import axios from "axios";
import { useEffect, useState } from "react";


function Profile() {
    const [userinfo, setUserinfo] = useState()
    const [loading, setLoading] = useState(true)
    const [errormes, setErrormes] = useState()
    useEffect(() => {
        setLoading(true)
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/currentUser`, {
                withCredentials: true,
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    setLoading(false)
                    setUserinfo(response.data.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching current user:", error);
                setLoading(false)
                setErrormes(error.message)
            });
    }, []);


    const { user } = useSelector((state) => state.auth)
    const { theme } = useSelector((state) => state.theme)

    if (loading) {
        return <h1>Loading</h1>
    }

    if (!userinfo) {
        return (
            <EmptyState />
        )
    }

    return (
        <div className="w-full h-full min-h-[85vh]">
            {/* Mobile Navigation - Fixed at top */}
            <div className="lg:hidden   top-0 z-50  p-2">
                <NavigationMenu />
            </div>

            {userinfo ? "yes" : "no"}

            {/* Desktop Layout */}
            <div className="hidden lg:flex w-full h-full p-4 gap-4 ">
                {/* Desktop Navigation Sidebar */}
                <div className={`w-1/3 min-w-0 flex-shrink-0  border  rounded-lg 
                ${theme == "dark" ? "border-gray-700" : "border-gray-300"}
                   `} >
                    <NavigationMenu />
                </div>

                {/* Desktop Main Content */}
                <div className="w-2/3 min-w-0  flex-1 ">
                    <div className={`w-full h-full  gap-4 border rounded-lg
                        ${theme == "dark" ? "border-gray-700" : "border-gray-300"}
                        `}>
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Mobile Content - Full width */}
            <div className="lg:hidden w-full p-2">
                <div className="w-full gap-4">
                    <Outlet />
                </div>
            </div>
        </div>


    )
}

export default Profile;