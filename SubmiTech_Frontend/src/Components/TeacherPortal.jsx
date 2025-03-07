/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherPortal = () => {
    const [TeacherData, setTeacherData] = useState(null);
    const [selectedLab, setSelectedLab] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const FetchTeacherData = async () => {
            try {
                const response = await axios.get("http://localhost:1817/Teach/labs", {
                    params: { email: "richard.green@example.com" },
                });
                setTeacherData(response.data);
            } catch (err) {
                console.error("Something went wrong!", err);
            }
        };
        FetchTeacherData();
    }, []);

    const toggleLab = (labId) => {
        setSelectedLab((prev) => (prev === labId ? null : labId));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-6">
            {TeacherData ? (
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
                        Welcome, {TeacherData.name}
                    </h1>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <p className="text-lg text-gray-700"><strong>Email:</strong> {TeacherData.email}</p>
                        <p className="text-lg text-gray-700"><strong>Department:</strong> {TeacherData.department}</p>
                    </div>
                    
                    <h2 className="mt-6 text-xl font-semibold text-gray-800">Your Labs</h2>
                    <div className="mt-4 flex flex-col gap-4">
                        {TeacherData?.batchesAlloted?.map((labObj) => (
                            <div key={labObj._id} className="w-full">
                                <button
                                    className={`w-full px-5 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 transform ${
                                        selectedLab === labObj._id
                                            ? "bg-blue-700 text-white scale-105 ring-2 ring-blue-300"
                                            : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"
                                    }`}
                                    onClick={() => toggleLab(labObj._id)}
                                >
                                    {labObj.labName}
                                </button>

                                {selectedLab === labObj._id && labObj.batch && (
                                    <div className="mt-3 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-700">Batches:</h3>
                                        {labObj.batch.length > 0 ? (
                                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                                {labObj.batch.map((batch, index) => (
                                                    <li key={index}>
                                                        <button
                                                            onClick={() => navigate("/teacher2", { state: { batch1: batch, labName: labObj.labName } })}
                                                            className="text-blue-600 hover:underline font-medium"
                                                        >
                                                            {batch}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-600">No batches assigned.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-gray-700 text-lg font-medium animate-pulse">Loading...</p>
            )}
        </div>
    );
};

export default TeacherPortal;