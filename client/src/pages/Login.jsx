import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getBaseUrl } from "../utils/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${getBaseUrl()}/login`, {
        email,
        password,
      });

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      setIsLoading(false);
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
            Smart tracking for smarter financial decisions.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="group">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block group-focus-within:text-violet-400 transition-colors">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="group">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block group-focus-within:text-violet-400 transition-colors">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              placeholder="••••••••"
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
                    CONNECTING
                  </span>

                  <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                </div>
              ) : (
                <span className="text-lg">Sign In</span>
              )}
            </div>
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          New here?{" "}
          <Link
            to="/register"
            className="text-white hover:text-violet-400 font-semibold transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
