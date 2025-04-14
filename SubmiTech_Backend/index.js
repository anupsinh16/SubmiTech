const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Students = require("./Models/StudentModel");
const Teacher = require("./Models/TeacherModel");
const { FetchStudentStatus } = require("./Controllers/StudentController");
const { FetchTeacherInfo, UpdateStatus, FetchStudentList } = require("./Controllers/TeacherController");
const StudRoutes = require("./Routes/StudentRoutes");
const AuthenticationRoutes = require("./Routes/AuthenticationRoutes");
const TeachRoutes = require("./Routes/TeacherRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");
const cors = require("cors");
const Admin = require("./Models/AdminModel")
dotenv.config();
const PORT = process.env.PORT || 1817;
const app = express(); // Define app first!

// Middleware
app.use(express.json());
app.use(cors());  // Allow all origins temporarily


// Routes
app.use('/Stud', StudRoutes);
app.use('/Teach', TeachRoutes);
app.use('/Authentication', AuthenticationRoutes);
app.use('/Admin', AdminRoutes);

// Database connection
const ConnectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
};

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
}).catch(err => {
    console.error("DB Connection Error:", err);
});


