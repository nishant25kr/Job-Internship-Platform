import React, { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("two@gmail.com");
  const [password, setPassword] = useState("two@123456");
  const [errorMsg, setErrorMsg] = useState("");

  const auth = useAuth();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      try {
        await auth.loginAction({ email, password });
      } catch (err) {
        setErrorMsg(err.message || "Login failed.");
      }
    } else {
      setErrorMsg("Please provide valid email and password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {errorMsg && (
          <div className="text-red-500 text-sm mb-3 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmitEvent}>
          <div className="mb-4">
            <label htmlFor="user-email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="user-email"
              name="email"
              placeholder="you@example.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
