import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-blue-100">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-green-700 mb-4">🎉 Thank You!</h1>
        <p className="text-gray-600 text-lg mb-6">
          Your feedback has been submitted successfully.
        </p>
        {/* <Link
          to="/"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Go to Homepage
        </Link> */}
      </div>
    </div>
  );
};

export default ThankYou;
