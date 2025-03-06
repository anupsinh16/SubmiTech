/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentPortal = () => {
    const [StudData, setStudData] = useState(null);


    useEffect(() => {
        const FetchStudData = async () => {
            try {
                const response = await axios.get("http://localhost:1817/stud/student", {
                    params: { rollno: 106 },
                });
                setStudData(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        FetchStudData();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-300 to-transparent opacity-50"></div>
            {StudData ? (
                <div className="relative bg-white shadow-2xl rounded-2xl p-8 max-w-xl w-full border border-gray-300">
                    <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-4 drop-shadow-lg">Welcome, {StudData.name}</h1>
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
                                <th className="border p-3 text-lg">Enrolled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {StudData.labSub.map((lab, index) => (
                                <tr key={lab._id} className={`text-center ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                                    <td className="border p-3 text-lg font-medium">{lab.labName}</td>
                                    <td className="border p-3 text-lg font-bold text-green-600 drop-shadow-md">{lab.checked ? "✔️" : "❌"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-800 text-lg font-semibold">Loading...</p>
            )}
        </div>
    );
};

export default StudentPortal;