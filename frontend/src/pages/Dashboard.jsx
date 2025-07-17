import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import noFormsImg from "../assets/no-forms.svg";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const [forms, setForms] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/forms/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Ensure res.data is valid
        const fetchedForms = Array.isArray(res.data) ? res.data : res.data.forms || [];
        setForms(fetchedForms);
      } catch (err) {
        console.error("❌ Error fetching forms:", err);
        setError("Failed to fetch forms");
        setForms([]); // fallback to prevent undefined
      }
    };

    fetchForms();
  }, []);

  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this form?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/forms/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("🗑️ Form deleted successfully!");
      setForms((prev) => prev.filter((form) => form.slug !== slug));
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Failed to delete form");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      {forms?.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            👋 Welcome back,{" "}
            <span className="text-blue-600">{user?.name}</span>
          </h1>
          <button
            onClick={() => navigate("/create-form")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-sm transition"
          >
            ➕ Create New Form
          </button>
        </div>
      )}

      {error && (
        <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {forms?.length === 0 ? (
        <div className="flex flex-col items-center mt-16 text-center">
          <img
            src={noFormsImg}
            alt="No Forms"
            className="w-64 h-64 object-contain mb-6"
          />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Hello, <span className="text-blue-600">{user?.name}</span> 👋
          </h3>
          <p className="text-gray-500 mb-4">
            You haven’t created any feedback forms yet.
          </p>
          <button
            onClick={() => navigate("/create-form")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            ➕ Create Your First Form
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <div
              key={form._id}
              className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {form.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                📅 Created on:{" "}
                {new Date(form.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700 break-words mb-2">
                🔗 Public Link:{" "}
                <a
                  href={`/form/${form.slug}`}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  /form/{form.slug}
                </a>
              </p>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/form/${form.slug}`
                  );
                  toast.success("🔗 Link copied to clipboard!");
                }}
                className="text-sm text-blue-600 hover:text-blue-800 mb-3"
              >
                📋 Copy Public Link
              </button>

              <button
                className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-2"
                onClick={() => navigate(`/responses/${form.slug}`)}
              >
                📥 View Responses
              </button>

              <button
                onClick={() => handleDelete(form.slug)}
                className="w-full px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                🗑️ Delete Form
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
