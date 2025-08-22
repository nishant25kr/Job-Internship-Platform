import { useState } from "react";
import Button from "../Button";
import Input from "../Inputt";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    passwordChangeStart,
    passwordChangeSuccess,
    passwordChangeFailure,
} from "../../features/AuthSlice";

function ChangePass() {
    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const { theme } = useSelector((state) => state.theme);
    // const { passwordLoading } = useSelector((state) => state.auth);
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [error, setError] = useState({});
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const handlesubmit = async (e) => {
        e.preventDefault();
        setError({});
        setMessage("");

        let errors = {};
        if (!oldpassword) errors.oldpassword = "Old password required";
        if (!newpassword) errors.newpassword = "New password required";
        if (!confpassword) errors.confpassword = "Confirm your new password";
        if (newpassword !== confpassword) {
            errors.confpassword = "Passwords don't match";
        }
        if (Object.keys(errors).length) {
            setError(errors);
            return;
        }

        // dispatch(passwordChangeStart());
        setPasswordLoading(true)
        try {
            console.log("hi")
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/changePassword`,
                { oldpassword, newpassword, confpassword },
                { withCredentials: true }
            );
            if (response.data.success) {
                setMessage(response.data.message);
                setPasswordLoading(false)
                
            } else {
                setMessage(response.data.message || "Password change failed");
                setPasswordLoading(false)
                
            }
        } catch (err) {
            setMessage("Server error. Try again later.");
            setPasswordLoading(false)
        }
    };

    return (
        <div className={`w-full my-auto max-w-lg mx-auto border p-6 rounded-xl shadow-lg 
            ${theme === 'dark' 
                ? 'border-gray-700 text-white' 
                : 'border-gray-300 text-gray-800'
            } mt-8`}>

            <h2 className="text-xl font-semibold mb-6 text-center">Change your password</h2>
            
            <form className="space-y-4" onSubmit={handlesubmit}>
                <Input
                    type="password"
                    value={oldpassword}
                    onChange={(e) => setOldpassword(e.target.value)}
                    placeholder="Enter your old password"
                    className={` ${error.oldpassword
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                        } 
                        }`}
                    required
                    autoComplete="current-password"
                />
                {error.oldpassword && (
                    <div className="text-red-500 text-sm">{error.oldpassword}</div>
                )}

                <Input
                    type="password"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                    placeholder="Enter your new password"
                    className={`w-full px-4 py-3 border ${error.newpassword
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                        }  
                        }`}
                    required
                    autoComplete="new-password"
                />
                {error.newpassword && (
                    <div className="text-red-500 text-sm">{error.newpassword}</div>
                )}

                <Input
                    type="password"
                    value={confpassword}
                    onChange={(e) => setConfpassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className={`w-full px-4 py-3 border ${error.confpassword
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                        } rounded-lg focus:ring-2 focus:ring-purple-500 transition-all duration-200 
                        }`}
                    required
                    autoComplete="new-password"
                />
                {error.confpassword && (
                    <div className="text-red-500 text-sm">{error.confpassword}</div>
                )}

                <Button
                    type="submit"
                    className="w-full mt-4 mx-auto"
                >
                    {passwordLoading ? "Changing..." : "Change password"}
                </Button>

            </form>

            {message && (
                <div className={`mt-6 text-center text-sm
                    ${message.toLowerCase().includes("success") ? "text-green-500" : "text-red-500"}
                `}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default ChangePass;
