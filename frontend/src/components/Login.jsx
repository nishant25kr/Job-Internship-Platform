import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Login() {
  const { Login } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Login({ email, password });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-sm p-6 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} />
          </div>

          <div className="mb-4">
             <input type="password" onChange={(e)=>{setPassword(e.target.value)}} />

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
