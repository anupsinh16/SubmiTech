import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TeacherPortal2 = () => {
    const [studentList, setStudentList] = useState([]);
    const location = useLocation();
    const { batch1, labName } = location.state || {};

    useEffect(() => {
        const FetchStudents = async () => {
            try {
                const response = await axios.get("https://submitech-backend.onrender.com/Teach/labstudents", {
                    params: { batch: batch1 },
                });
                
                const updatedStudents = response.data.map(student => {
                    const labEntry = student.labSub.find(lab => lab.labName === labName);
                    return {
                        ...student,
                        checked: labEntry ? labEntry.checked : false
                    };
                });
                
                setStudentList(updatedStudents);
            } catch (err) {
                console.error("Something Went Wrong!", err);
            }
        };
        FetchStudents();
    }, [batch1, labName]);

    const HandleCheck = async (rollno) => {
        try {
            const updatedList = studentList.map(student => 
                student.rollno === rollno ? { ...student, checked: !student.checked } : student
            );
            setStudentList(updatedList);
            
            await axios.post("https://submitech-backend.onrender.com/Teach/updateStat", {
                rollno: rollno,
                batch: batch1,
                labName: labName
            });
        } catch (err) {
            console.log("Something went wrong!", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 flex flex-col items-center p-6 shadow-xl">
            <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">Batch: {batch1}</h1>
            <h2 className="text-xl text-gray-200 drop-shadow-md">Lab Name: {labName}</h2>
            
            <div className="mt-6 w-full max-w-4xl overflow-x-auto bg-white rounded-xl shadow-2xl p-4">
                <table className="min-w-full rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-left">
                            <th className="px-6 py-3">Roll No</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Lab Name</th>
                            <th className="px-6 py-3">Checked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.length > 0 ? (
                            studentList.map((student, index) => (
                                <tr 
                                    key={index} 
                                    className={`border-b hover:bg-gray-100 transition-all ${student.checked ? 'bg-green-200 shadow-md' : 'bg-red-200 shadow-md'}`}
                                >
                                    <td className="px-6 py-3 font-semibold text-gray-800 drop-shadow-lg">{student.rollno}</td>
                                    <td className="px-6 py-3 font-semibold text-gray-800 drop-shadow-lg">{student.name}</td>
                                    <td className="px-6 py-3 font-semibold text-gray-800 drop-shadow-lg">{labName}</td>
                                    <td className="px-6 py-3">
                                        <button 
                                            className={`px-6 py-2 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform ${student.checked ? 'bg-red-500 hover:bg-red-700 scale-105' : 'bg-green-500 hover:bg-green-700 scale-105'}`}
                                            onClick={() => HandleCheck(student.rollno)}
                                        >
                                            {student.checked ? 'Uncheck' : 'Check'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500 font-semibold">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherPortal2;
