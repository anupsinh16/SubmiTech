const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Students = require("./Models/StudentModel");
const Teacher = require("./Models/TeacherModel");
const {Dstudents,Dteachers} = require("./dummyData")
const {FetchStudentStatus} = require("./Controllers/StudentController")
const {FetchTeacherInfo, UpdateStatus, FetchStudentList} = require("./Controllers/TeacherController")
const StudRoutes = require("./Routes/StudentRoutes");
const TeachRoutes = require("./Routes/TeacherRoutes"); 
const {cors} = require("cors");
const PORT = 1817;
const ConnectDB = async()=> {
    await mongoose.connect('mongodb://localhost:27017/SubmiTech');
    console.log("Database Connected");
    app.listen(PORT,()=>{
        console.log(`Server is listening on ${PORT}`);
    })
}

ConnectDB();

const mockReq = { body: { 
    // rollno : 101,
    // labName : "DBMS"
    batch : "B1"
 } }; // Replace with actual email

const mockRes = {
    status: (code) => ({
        json: (data) => console.log(`Status: ${code}`, data),
    }),
};
//FetchTeacherInfo(mockReq,mockRes).then((batches) => console.log(batches));
//UpdateStatus(mockReq,mockRes).then((stat) => console.log(stat));
//FetchStudentList(mockReq,mockRes).then((stat) => console.log(stat));

const app = express();

app.use(express.json());


app.use('/Stud',StudRoutes);
app.use('/Teach',TeachRoutes);










