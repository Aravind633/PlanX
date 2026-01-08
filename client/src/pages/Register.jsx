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

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${getBaseUrl()}/register`, inputState);

      setIsLoading(false);
      setTimeout(() => {
        alert("Registration Successful! Please Login.");
        navigate("/login");
      }, 10);
    } catch (error) {
      setIsLoading(false);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-violet-600/30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px]"></div>

      <div className="glass-card p-10 w-full max-w-md z-10 relative border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">
            Plan<span className="text-violet-500">X</span>
          </h1>
          <p className="text-gray-400">
            Track expenses, grow investments, and master your money.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block group-focus-within:text-violet-400 transition-colors">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              value={inputState.name}
              onChange={(e) =>
                setInputState({ ...inputState, name: e.target.value })
              }
              required
            />
          </div>

          <div className="group">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block group-focus-within:text-violet-400 transition-colors">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              value={inputState.email}
              onChange={(e) =>
                setInputState({ ...inputState, email: e.target.value })
              }
              required
            />
          </div>

          <div className="group">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block group-focus-within:text-violet-400 transition-colors">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              value={inputState.password}
              onChange={(e) =>
                setInputState({ ...inputState, password: e.target.value })
              }
              required
            />
          </div>

          <button
            disabled={isLoading}
            className={`
              relative w-full font-bold py-4 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform
              ${
                isLoading
                  ? "cursor-wait scale-[0.98]"
                  : "hover:scale-[1.02] hover:shadow-violet-500/25 active:scale-[0.98]"
              }
            `}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 
              ${isLoading ? "animate-gradient-x opacity-100" : "opacity-0"} 
              transition-opacity duration-300`}
            ></div>

            <div
              className={`absolute inset-0 bg-violet-600 
              ${isLoading ? "opacity-0" : "opacity-100"} 
              transition-opacity duration-300`}
            ></div>

            <div className="relative flex items-center justify-center text-white z-10">
              {isLoading ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium tracking-wide mr-2">
                    CREATING ACCOUNT
                  </span>

                  <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                </div>
              ) : (
                <span className="text-lg">Create Account</span>
              )}
            </div>
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
