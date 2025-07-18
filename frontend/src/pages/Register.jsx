import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/auth/register", form);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed");
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md animate-fadeIn"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 tracking-tight">
          Admin Register
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center font-medium">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
        >
          Register
        </button>

        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline font-medium cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
