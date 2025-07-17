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
    console.log("🌐 API Base URL:", import.meta.env.VITE_API_URL);
console.log("Registering:", form);

    e.preventDefault();
    setError("");

    try {
      console.log("Registering:", form); // ✅ Console me form data aa raha hai

      // 🔥 API call here
      const res = await axios.post("/api/auth/register", form);
      toast.success("Registered successfully!");
      console.log("✅ Registration success:", res.data);

      // ✅ Redirect to login page
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed");
      console.error("❌ Register error:", err.response?.data?.msg || err.message);
      setError(err.response?.data?.msg || "Registration failed");
    }
  };
  


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Register
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
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
