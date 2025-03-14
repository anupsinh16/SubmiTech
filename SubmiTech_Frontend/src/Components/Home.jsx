/* eslint-disable no-unused-vars */
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-blue-500 text-white p-8">
      <div className="max-w-4xl w-full bg-white text-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SubmiTech</h1>
        <p className="text-lg text-center mb-6">
          Submit your assignments and projects seamlessly for PICT College.
        </p>
        
        {/* Image */}
        <img src="https://pict.edu/images/pic.jpg" alt="PICT College" className="w-64 h-40 rounded-lg mb-6" />

        <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition">
          Start Submission
        </button>
      </div>
    </div>
  );
};

export default HomePage;
