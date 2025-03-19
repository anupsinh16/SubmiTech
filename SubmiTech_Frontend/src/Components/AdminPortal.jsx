/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPortal = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [labs, setLabs] = useState([]);
  const [selectedrollno, setSelectedrollno] = useState(null);
  const [addstud, setAddstud] = useState(false);

  const handleStudent = async () => {
    try {
      const response = await axios.get('http://localhost:1817/Admin/all-students');
      setStudents(response.data);
    } catch (err) {
      console.error('Cannot fetch students:', err);
    }
  };

  const handleTeacher = async () => {
    try {
      const response = await axios.get('http://localhost:1817/Admin/all-teachers');
      setTeachers(response.data);
    } catch (err) {
      console.error('Error in fetching teacher list:', err);
    }
  };

  const handleaddstud = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    try {
      const formData = new FormData(e.target); // e.target is the form element
  
      const data = Object.fromEntries(formData.entries());
  
      console.log("Form Data:", data);

      const labsub = [
        data.labName1,
        data.labName2,
        data.labName3,
        data.labName4,
        data.labName5
      ]
        .filter((name) => name && name.length > 0)
        .map((name) => ({
          labName: name,
          checked: false
        }));

      const newstud = {
        
          "rollno":data.rollno,
          "name":data.name,
          "password":data.password,
          "department":data.department,
          "academicYear":data.academicYear,
          "sem":data.sem,
          "div":data.div,
          "batch":data.batch,
          "labsub": labsub
      };

      await axios.post(`http://localhost:1817/Admin/new-student/`,newstud);
      console.log("Added Student Successfully");
      e.target.reset();

    } catch (err) {
      console.log("Error in adding new student", err);
    }
  };
  useEffect(() => {
    if (selectedrollno !== null) {
      const student = students.find((s) => s.rollno === selectedrollno);
      setLabs(student ? student.labSub : []);
    }
  }, [selectedrollno, students]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Portal</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Students Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <button onClick={handleStudent} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full font-semibold">
            Display all Students
          </button>
          {students.length > 0 && (
            <table className="w-full mt-4 border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Student Name</th>
                  <th className="p-2 border">Check Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((stud) => (
                  <tr key={stud._id} className="hover:bg-gray-100">
                    <td className="p-2 border text-center">{stud.name}</td>
                    <td className="p-2 border text-center">
                      <button onClick={() => setSelectedrollno(stud.rollno)} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                        Check
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Lab Details Section */}
        {labs.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Lab Details</h3>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Lab Name</th>
                  <th className="p-2 border">Checked</th>
                </tr>
              </thead>
              <tbody>
                {labs.map((sub) => (
                  <tr key={sub._id} className="hover:bg-gray-100">
                    <td className="p-2 border text-center">{sub.labName}</td>
                    <td className="p-2 border text-center">{sub.checked ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Teachers Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <button onClick={handleTeacher} className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 w-full font-semibold">
          Display all Teachers
        </button>
        {teachers.length > 0 && (
          <table className="w-full mt-4 border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Teacher Name</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id} className="hover:bg-gray-100">
                  <td className="p-2 border text-center">{teacher.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <button
          onClick={() => setAddstud(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-semibold mb-4"
        >
          Add New Student
        </button>

        {addstud && (
          <>
            <h2 className="text-xl font-bold mb-4 text-gray-700">Add Student Form</h2>
            <form onSubmit={handleaddstud} className="space-y-4">
              {[
                { label: 'Roll no', name: 'rollno', type: 'number' },
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Password', name: 'password', type: 'password' },
                { label: 'Department', name: 'department', type: 'text' },
                { label: 'Academic Year', name: 'academicYear', type: 'text' },
                { label: 'Semester', name: 'sem', type: 'number' },
                { label: 'Division', name: 'div', type: 'number' },
                { label: 'Batch', name: 'batch', type: 'text' }
              ].map((field, idx) => (
                <div key={idx}>
                  <label htmlFor={field.name} className="block font-medium text-gray-600">{field.label}:</label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    placeholder={`Enter ${field.label.toLowerCase()} here`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
              ))}

              <div>
                <label className="block font-medium text-gray-600">Lab Subjects:</label>
                {[1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    id={`labName${i}`}
                    name={`labName${i}`}
                    placeholder="Enter lab subject here"
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-semibold"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>

    </div>
  );
};

export default AdminPortal; 