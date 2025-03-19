/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  // const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // const handleMouseMove = (e) => {
  //   const { left, top, width, height } = e.target.getBoundingClientRect();
  //   const x = ((e.clientX - left - width / 2) / 10).toFixed(2);
  //   const y = ((e.clientY - top - height / 2) / 10).toFixed(2);
  //   setTilt({ x, y });
  // };

  // const handleMouseLeave = () => {
  //   setTilt({ x: 0, y: 0 });
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-blue-500 text-white p-8">
      <div className="max-w-4xl w-full bg-white text-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SubmiTech</h1>
        <p className="text-lg text-center mb-6">
          Check and update your Submissions hustle free... 
        </p>

        {/* Fast & dynamic animated image with shadow */}
        <img
          src="https://pict.edu/images/pic.jpg"
          alt="PICT College"
          className="w-64 rounded-3xl mb-6 transition-transform duration-150 ease-out 
                     shadow-2xl drop-shadow-lg border-sky-100 border-2"
          
          
        />

        <button
          className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition"
          onClick={() => navigate('/student')}
        >
          Start Submission
        </button>
      </div>
    </div>
  );
};

export default HomePage;
