import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex flex-col">
      {/* ✅ NAVBAR */}
      <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-3xl font-bold text-purple-700 tracking-wide">
            <span className="text-blue-600">📋</span> FeedStack
          </h1>
        </div>
      </nav>

      {/* ✅ MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full text-center"
        >
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl font-extrabold text-gray-800 mb-4"
          >
            Built for Effortless Feedback 🚀
          </motion.h2>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            <span className="font-semibold">FeedStack</span> helps you
            <span className="text-purple-600 font-semibold"> create</span>,
            <span className="text-blue-600 font-semibold"> share</span>, and
            <span className="text-green-600 font-semibold"> visualize</span> feedback effortlessly.
          </p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-left text-gray-700 mb-6 space-y-2 max-w-lg mx-auto"
          >
            <li>✅ Quick form creation for feedback</li>
            <li>📊 Real-time feedback charts</li>
            <li>🔗 Shareable public form links</li>
            <li>🛡️ Mobile-friendly, safe & responsive</li>
          </motion.ul>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300">
                Get Started Now 🚀
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
