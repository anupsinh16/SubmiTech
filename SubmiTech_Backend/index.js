const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Students = require("./Models/StudentModel");
const Teacher = require("./Models/TeacherModel");
const { FetchStudentStatus } = require("./Controllers/StudentController");
const { FetchTeacherInfo, UpdateStatus, FetchStudentList } = require("./Controllers/TeacherController");
const StudRoutes = require("./Routes/StudentRoutes");
const TeachRoutes = require("./Routes/TeacherRoutes");
const cors = require("cors");

const PORT = 1817;
const app = express(); // Define app first!

// Middleware
app.use(express.json());
app.use(cors());  // Allow all origins temporarily


// Routes
app.use('/Stud', StudRoutes);
app.use('/Teach', TeachRoutes);

// Database connection
const ConnectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/SubmiTech');
    console.log("Database Connected");
};

// Start server **AFTER** connecting to DB
ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
}).catch(err => {
    console.error("DB Connection Error:", err);
});
