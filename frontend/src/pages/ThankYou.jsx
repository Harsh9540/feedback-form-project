import React from "react";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-50">
      <div className="text-center p-10 bg-white rounded-2xl shadow-xl max-w-md">
        <h1 className="text-4xl font-extrabold text-green-700 mb-3">
          🎉 Thank You!
        </h1>
        <p className="text-gray-700 text-lg font-medium">
          Your response has been recorded.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
