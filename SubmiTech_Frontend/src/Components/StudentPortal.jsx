/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
//const user = JSON.parse(localStorage.getItem("user") || "{}");

const StudentPortal = () => {
    const [StudData, setStudData] = useState(null);
    const [user,setUser] = useState(()=>JSON.parse(localStorage.getItem("user") || "{}"));
    const location = useLocation();
    //const { rollno } = location.state || {};
    const {rollno} = user;
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.rollno) {
            const FetchStudData = async () => {
                try {
                    const response = await axios.get("http://localhost:1817/Stud/student", {
                        params: { rollno },
                    });
                    setStudData(response.data);

                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            };
            FetchStudData();
        }
       
    }, [user,rollno]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/student"); 
        window.location.reload();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-300 to-transparent opacity-50"></div>

            {!user || !user.rollno ? (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <p className="text-gray-800 text-lg font-semibold mb-4">
                  Please login first
                </p>
                <button
                  onClick={() => navigate("/student")}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition rounded"
                >
                  Go to login page
                </button>
              </div>
            ) : !StudData ? (
                <p className="text-gray-800 text-lg font-semibold">Loading...</p>
            ) : (
                <div className="relative bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full border border-gray-300">
                    <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-4 drop-shadow-lg">
                        Welcome, {StudData.name}
                    </h1>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <p className="text-lg"><strong>Roll No:</strong> {StudData.rollno}</p>
                        <p className="text-lg"><strong>Department:</strong> {StudData.department}</p>
                        <p className="text-lg"><strong>Academic Year:</strong> {StudData.academicYear}</p>
                        <p className="text-lg"><strong>Semester:</strong> {StudData.sem}</p>
                        <p className="text-lg"><strong>Division:</strong> {StudData.division}</p>
                        <p className="text-lg"><strong>Batch:</strong> {StudData.batch}</p>
                    </div>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900 drop-shadow-lg">Lab Subjects</h2>
                    <table className="w-full mt-3 border-collapse border border-gray-400 shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-purple-500 text-white">
                                <th className="border p-3 text-lg">Lab Name</th>
                                <th className="border p-3 text-lg">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {StudData.labSub.map((lab, index) => (
                                <tr key={lab._id} className={`text-center ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                                    <td className="border p-3 text-lg font-medium">{lab.labName}</td>
                                    <td className="border p-3 text-lg font-bold text-green-600 drop-shadow-md">
                                        {lab.checked ? "✔️" : "❌"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Logout Button */}
                    <div className="flex justify-center mt-6">
                        <button 
                            onClick={handleLogout} 
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentPortal;
