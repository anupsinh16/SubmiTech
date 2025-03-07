/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherPortal = () => {
    const [TeacherData, setTeacherData] = useState(null);
    const [selectedLab, setSelectedLab] = useState(null); // Set default as null

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
        setSelectedLab((prev) => (prev === labId ? null : labId)); // Toggle logic
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            {TeacherData ? (
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
                    <h1 className="text-2xl font-bold text-center text-gray-800">
                        Welcome, {TeacherData.name}
                    </h1>
                    <div className="mt-4">
                        <p><strong>Email:</strong> {TeacherData.email}</p>
                        <p><strong>Department:</strong> {TeacherData.department}</p>
                    </div>

                    <h2 className="mt-6 text-lg font-semibold">Your Labs</h2>
                    <div className="mt-4 flex flex-col gap-3">
                        {TeacherData?.batchesAlloted?.map((labObj) => (
                            <div key={labObj._id} className="w-full">
                                <button
                                    className={`w-full px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${
                                        selectedLab === labObj._id
                                            ? "bg-blue-700 text-white scale-105"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                    onClick={() => toggleLab(labObj._id)}
                                >
                                    {labObj.labName}
                                </button>

                                {/* Display batches only if lab is selected & has batches */}
                                {selectedLab === labObj._id && labObj.batch && (
                                    <div className="mt-3 p-3 bg-gray-100 rounded-lg shadow-inner">
                                        <h3 className="text-md font-semibold text-gray-700">Batches:</h3>
                                        {labObj.batch.length > 0 ? (
                                            <ul className="list-disc pl-5">
                                                {labObj.batch.map((batch, index) => (
                                                    <li key={index} className="text-gray-800">{batch}</li>
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
                <p className="text-gray-700 text-lg">Loading...</p>
            )}
        </div>
    );
};

export default TeacherPortal;
