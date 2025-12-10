import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
      // Connect to the Backend Register Endpoint
      await axios.post("http://localhost:5000/api/v1/register", inputState);

      alert("Registration Successful! Please Login.");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-violet-50">
      <div className="w-96 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold text-violet-700 mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 mt-1 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 bg-gray-50"
              value={inputState.name}
              onChange={(e) =>
                setInputState({ ...inputState, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full p-3 mt-1 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 bg-gray-50"
              value={inputState.email}
              onChange={(e) =>
                setInputState({ ...inputState, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="******"
              className="w-full p-3 mt-1 border border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 bg-gray-50"
              value={inputState.password}
              onChange={(e) =>
                setInputState({ ...inputState, password: e.target.value })
              }
            />
          </div>

          <button className="w-full py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition shadow-lg shadow-violet-200">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-violet-600 font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
