import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-xl w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to Feedbackify 📝
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Create and collect feedback with ease. Share public forms and view responses with powerful visualizations.
        </p>

        <Link to="/login">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-all duration-300">
            🚀 Login Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;


