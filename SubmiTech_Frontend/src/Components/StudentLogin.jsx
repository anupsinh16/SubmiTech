/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const [enrollment, setEnrollment] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.get("http://localhost:1817/Authentication/student", {
        params: { rollno: enrollment, password },
      });

      if (response.data.success) {
        navigate("/student-portal", { state: { rollno: enrollment } });
      } 
      else if(!response.data.message) {
        setErrorMessage("Incorrect Roll No or Password");
        setShowModal(true);
      }
      else{
        setErrorMessage(response.data.message);
        setShowModal(true);
      }
    } catch (err) {
      console.error("Authentication Error:", err);
      setErrorMessage("Server error. Try again later.");
      setShowModal(true); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-blue-500 text-white p-8">
      <div className="max-w-md w-full bg-white text-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Student Login</h1>
        <p className="text-lg text-center mb-6">Access your SubmiTech account</p>

        <form className="w-full" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Enrollment Number</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg mt-1"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <a href="#" className="text-pink-600 hover:underline">Forgot Password?</a>
        </div>
      </div>

      {/* Error Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <h2 className="text-2xl font-bold text-gray-800">Login Failed</h2>
            <p className="text-gray-700 mt-2">{errorMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLogin;
