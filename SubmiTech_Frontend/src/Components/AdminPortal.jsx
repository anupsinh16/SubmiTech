/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const AdminPortal = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [labs, setLabs] = useState([]);
  const [selectedrollno, setSelectedrollno] = useState(null);
  const [addstud, setAddstud] = useState(false);
  const [addteacher, setAddteacher] = useState(false);
  const [labBatchFields, setLabBatchFields] = useState([{ labName: '', batches: [''] }]);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate("/admin");
    }
  }, [user, navigate]);
  
  if (!user) return null; // Avoid rendering anything if user is null
  
  
  

  const handleStudent = async () => {
    try {
      const response = await axios.get('https://submitech-backend.onrender.com/Admin/all-students');
      setStudents(response.data);
    } catch (err) {
      console.error('Cannot fetch students:', err);
    }
  };

  const handleTeacher = async () => {
    try {
      const response = await axios.get('https://submitech-backend.onrender.com/Admin/all-teachers');
      setTeachers(response.data);
    } catch (err) {
      console.error('Error in fetching teacher list:', err);
    }
  };

  const handleaddstud = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const labsub = [1, 2, 3, 4, 5].map((i) => data[`labName${i}`])
        .filter(Boolean)
        .map((name) => ({ labName: name, checked: false }));

      const newstud = {
        rollno: data.rollno,
        name: data.name,
        password: data.password,
        department: data.department,
        academicYear: data.academicYear,
        sem: data.sem,
        div: data.div,
        batch: data.batch,
        labsub,
      };

      await axios.post(`https://submitech-backend.onrender.com/Admin/new-student/`, newstud);
      alert('Student added successfully');
      e.target.reset();
    } catch (err) {
      console.log('Error in adding new student', err);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const teacher = {
        name: data.name,
        email: data.email,
        department: data.department,
        password: data.password,
        cc: data.cc,
        batchesAlloted: labBatchFields
          .filter((field) => field.labName.trim().length > 0)
          .map((field) => ({
            labName: field.labName.trim(),
            batch: field.batches.filter((b) => b.trim().length > 0),
          })),
      };

      await axios.post('https://submitech-backend.onrender.com/Admin/new-teacher', teacher);
      alert('Teacher added successfully');
      e.target.reset();
      setLabBatchFields([{ labName: '', batches: [''] }]);
    } catch (err) {
      console.error('Error adding teacher', err);
    }
  };

  useEffect(() => {
    if (selectedrollno !== null) {
      const student = students.find((s) => s.rollno === selectedrollno);
      setLabs(student ? student.labSub : []);
    }
  }, [selectedrollno, students]);

  if (!user) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <p className="text-gray-800 text-lg font-semibold mb-4">Please login first</p>
            <button
                onClick={() => navigate("/admin-login")}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
            >
                Go to login page
            </button>
        </div>
    );
}

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Admin Portal</h1>

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Students Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-center mb-4">
            <button
              onClick={handleStudent}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Display All Students
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Student Table */}
            {students.length > 0 && (
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-blue-100 text-gray-700">
                    <tr>
                      <th className="py-2 px-4 border">Student Name</th>
                      <th className="py-2 px-4 border">Check Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((stud) => (
                      <tr key={stud._id} className="text-center hover:bg-gray-100">
                        <td className="border px-4 py-2">{stud.name}</td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => setSelectedrollno(stud.rollno)}
                            className={`bg-green-500 text-white px-3 py-1 rounded  
                              ${selectedrollno === stud.rollno ? "bg-red-500":"bg-green-500"}`}
                          >
                            Check
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Right-Side Modal */}
            {labs.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-xl w-full md:w-1/2 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Lab Details</h3>
                <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-green-100 text-gray-700">
                    <tr>
                      <th className="py-2 px-4 border">Lab Name</th>
                      <th className="py-2 px-4 border">Checked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labs.map((sub, i) => (
                      <tr key={i} className="text-center hover:bg-gray-50">
                        <td className="border px-4 py-2">{sub.labName}</td>
                        <td className="border px-4 py-2">{sub.checked ? '✅' : '❌'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Teachers Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-center mb-4">
            <button
              onClick={handleTeacher}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-semibold"
            >
              Display All Teachers
            </button>
          </div>

          {teachers.length > 0 && (
            <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-purple-100 text-gray-700">
                <tr>
                  <th className="py-2 px-4 border">Teacher Name</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id} className="text-center hover:bg-gray-50">
                    <td className="border px-4 py-2">{teacher.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add Student */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-center mb-4">
            <button
              onClick={() => setAddstud(!addstud)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold"
            >
              {addstud ? 'Hide Student Form' : 'Add New Student'}
            </button>
          </div>

          {addstud && (
            <form onSubmit={handleaddstud} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Roll No', name: 'rollno', type: 'number' },
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Password', name: 'password', type: 'password' },
                { label: 'Department', name: 'department', type: 'text' },
                { label: 'Academic Year', name: 'academicYear', type: 'text' },
                { label: 'Semester', name: 'sem', type: 'number' },
                { label: 'Division', name: 'div', type: 'number' },
                { label: 'Batch', name: 'batch', type: 'text' },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block mb-1 font-medium">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none"
                  />
                </div>
              ))}

              <div className="col-span-full">
                <label className="block mb-2 font-medium">Lab Subjects</label>
                {[1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    name={`labName${i}`}
                    placeholder="Enter lab subject"
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="col-span-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Submit
              </button>
            </form>
          )}
        </div>

        {/* Add Teacher */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-center mb-4">
            <button
              onClick={() => setAddteacher(!addteacher)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold"
            >
              {addteacher ? 'Hide Teacher Form' : 'Add New Teacher'}
            </button>
          </div>

          {addteacher && (
            <form onSubmit={handleAddTeacher} className="space-y-4">
              {[
                { label: 'Name', name: 'name' },
                { label: 'Email', name: 'email' },
                { label: 'Department', name: 'department' },
                { label: 'Password', name: 'password', type: 'password' },
                { label: 'CC', name: 'cc' },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block mb-1 font-medium">{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block font-medium mb-2">Batches Allotted:</label>
                {labBatchFields.map((field, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg border mb-4">
                    <input
                      type="text"
                      placeholder="Lab Name"
                      value={field.labName}
                      onChange={(e) => {
                        const updated = [...labBatchFields];
                        updated[i].labName = e.target.value;
                        setLabBatchFields(updated);
                      }}
                      className="w-full mb-2 px-4 py-2 border rounded-lg"
                    />
                    {field.batches.map((batch, j) => (
                      <div key={j} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          placeholder={`Batch ${j + 1}`}
                          value={batch}
                          onChange={(e) => {
                            const updated = [...labBatchFields];
                            updated[i].batches[j] = e.target.value;
                            setLabBatchFields(updated);
                          }}
                          className="flex-1 px-4 py-2 border rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...labBatchFields];
                            updated[i].batches.splice(j, 1);
                            setLabBatchFields(updated);
                          }}
                          className="text-red-500"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...labBatchFields];
                        updated[i].batches.push('');
                        setLabBatchFields(updated);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ➕ Add Batch
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setLabBatchFields([...labBatchFields, { labName: '', batches: [''] }])
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  ➕ Add Another Lab
                </button>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
