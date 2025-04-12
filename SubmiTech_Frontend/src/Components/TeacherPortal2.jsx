/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const TeacherPortal2 = () => {
    const [studentList, setStudentList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [assignmentData, setAssignmentData] = useState({ rollno: null, reason: "", description: "" });
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const { batch1, labName } = location.state || {};

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("https://submitech-backend.onrender.com/Teach/labstudents", {
                    params: { batch: batch1 },
                });

                const updatedStudents = response.data.map(student => {
                    const labEntry = student.labSub?.find(lab => lab.labName === labName);
                    const attendanceEntry = student.labWiseAttendance?.find(lab => lab.labName === labName);
                    return {
                        ...student,
                        checked: labEntry?.checked || false,
                        labAttendance: attendanceEntry?.attendance || 0
                    };
                });

                setStudentList(updatedStudents);
            } catch (err) {
                console.error("Error fetching students:", err);
            }
        };

        fetchStudents();
    }, [batch1, labName]);

    const handleCheckToggle = async (rollno) => {
        try {
            const updatedList = studentList.map(student =>
                student.rollno === rollno ? { ...student, checked: !student.checked } : student
            );
            setStudentList(updatedList);

            await axios.post("https://submitech-backend.onrender.com/Teach/updateStat", {
                rollno,
                batch: batch1,
                labName
            });
        } catch (err) {
            console.error("Error updating check status:", err);
        }
    };

    const handleOpenModal = (rollno) => {
        setAssignmentData({ rollno, reason: "", description: "" });
        setShowModal(true);
    };

    const handleSubmitAssignment = async () => {
        try {
            setLoading(true);
            await axios.post("https://submitech-backend.onrender.com/Teach/addExtraAssignment", {
                rollno: assignmentData.rollno,
                labName: labName,
                reason: assignmentData.reason,
                description: assignmentData.description
            });
            alert("Assignment added successfully!");
            setShowModal(false);
            setAssignmentData({ rollno: null, reason: "", description: "" });
        } catch (err) {
            console.error("Error adding assignment:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 flex flex-col items-center p-6 shadow-xl">
            <h1 className="text-3xl font-extrabold text-white drop-shadow-lg">Batch: {batch1}</h1>
            <h2 className="text-xl text-gray-200 drop-shadow-md">Lab Name: {labName}</h2>

            <div className="mt-6 w-full max-w-6xl overflow-x-auto bg-white rounded-xl shadow-2xl p-4">
                <table className="min-w-full rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-left">
                            <th className="px-4 py-3">Roll No</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Attendance</th>
                            <th className="px-4 py-3">Check</th>
                            <th className="px-4 py-3">Assignment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.length > 0 ? (
                            studentList.map((student, index) => (
                                <tr
                                    key={index}
                                    className={`border-b transition-all ${student.checked ? 'bg-green-200' : 'bg-red-200'} shadow-md`}
                                >
                                    <td className="px-4 py-3 font-semibold text-gray-800">{student.rollno}</td>
                                    <td className="px-4 py-3 font-semibold text-gray-800">{student.name}</td>
                                    <td className="px-4 py-3 font-semibold text-gray-800">{student.labAttendance}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            className={`px-4 py-1 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform ${student.checked ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} scale-105`}
                                            onClick={() => handleCheckToggle(student.rollno)}
                                        >
                                            {student.checked ? 'Uncheck' : 'Check'}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            className="px-4 py-1 bg-green-400 hover:bg-green-800 text-white font-bold rounded-lg shadow-md transition-all duration-300 scale-105"
                                            onClick={() => handleOpenModal(student.rollno)}
                                        >
                                            Give Assignment
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500 font-semibold">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4 text-gray-800">Add Extra Assignment</h3>
                        <input
                            type="text"
                            placeholder="Reason"
                            value={assignmentData.reason}
                            onChange={(e) => setAssignmentData({ ...assignmentData, reason: e.target.value })}
                            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <textarea
                            placeholder="Description"
                            value={assignmentData.description}
                            onChange={(e) => setAssignmentData({ ...assignmentData, description: e.target.value })}
                            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitAssignment}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherPortal2;
