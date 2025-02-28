const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Students = require("./Models/StudentModel");
const Teacher = require("./Models/TeacherModel");
const {Dstudents,Dteachers} = require("./dummyData")
const {FetchStudentStatus} = require("./Controllers/StudentController")


const ConnectDB = async()=> {
    await mongoose.connect('mongodb://localhost:27017/SubmiTech');
    console.log("Database Connected");
}

ConnectDB();








