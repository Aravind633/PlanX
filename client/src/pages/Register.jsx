import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getBaseUrl } from "../utils/config";

function Register() {
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Uses dynamic URL instead of localhost
      await axios.post(`${getBaseUrl()}/register`, inputState);

      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-violet-600/30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px]"></div>

      <div className="glass-card p-10 w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">
            Plan<span className="text-violet-500">X</span>
          </h1>
          <p className="text-gray-400">Join the premium finance club.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input-field"
              value={inputState.name}
              onChange={(e) =>
                setInputState({ ...inputState, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="input-field"
              value={inputState.email}
              onChange={(e) =>
                setInputState({ ...inputState, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input-field"
              value={inputState.password}
              onChange={(e) =>
                setInputState({ ...inputState, password: e.target.value })
              }
            />
          </div>

          <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-violet-900/40 transition-all hover:scale-[1.02] active:scale-95">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white hover:text-violet-400 font-semibold transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
