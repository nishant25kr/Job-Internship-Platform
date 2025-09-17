import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Button";


function CompanyDashboard() {
    // const { user } = useSelector((state) => state.auth); // assuming your AuthSlice stores decoded user info
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = {
        
    };

    const handleLogout = () => {
        localStorage.removeItem("companyToken");
        dispatch(loginFailure("Logged out"));
        navigate("/login-company"); // back to login page
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    Company Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Welcome, <span className="font-semibold">{user?.email || "Company User"}</span> 🎉
                </p>

                <div className="space-y-4">
                    <Button onClick={() => navigate("/company/profile")} className="w-full">
                        View Profile
                    </Button>
                    <Button onClick={() => navigate("/company/jobs")} className="w-full">
                        Manage Job Posts
                    </Button>
                    <Button onClick={() => navigate("/company/settings")} className="w-full">
                        Settings
                    </Button>
                </div>

                <div className="mt-8">
                    <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700">
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CompanyDashboard;
