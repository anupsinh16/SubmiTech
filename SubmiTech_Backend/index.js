const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Students = require("./Models/StudentModel");
const Teacher = require("./Models/TeacherModel");
const {Dstudents,Dteachers} = require("./dummyData")


const ConnectDB = async()=> {
    await mongoose.connect('mongodb://localhost:27017/SubmiTech');
    console.log("Database Connected");
}

ConnectDB();

// const student = new Students({
//     rollno: 101,
//     name: "John Doe",
//     passwords : "ABC@123",
//     department: "Computer Science",
//     academicYear: "2024",
//     sem: 5,
//     division: 1,
//     batch: "A",
//     labSub: ["DBMS", "OS"],
//     subCheck: [true, false]
// });


// const teacherData = new Teacher({
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     department: "Computer Science",
//     password: "securepassword123",  // Ideally, hash this before saving
//     Batch: ["A", "B", "C"],
//     cc: "CS101"
// });

// teacherData.save()
//     .then(() => console.log("Teacher data saved successfully"))
//     .catch(err => console.error(err));



// student.save()
//     .then(() => console.log("Student saved"))
//     .catch(err => console.error(err));

