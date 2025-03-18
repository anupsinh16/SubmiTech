const express = require("express");

const {FetchAllStudents,FetchAllTeachers,AddNewStudent,AddNewTeacher} = require("../Controllers/AdminController");

const router = express.Router();

router.get("/all-students",FetchAllStudents);
router.get("/all-teachers",FetchAllTeachers);
router.post("/new-student",AddNewStudent);
router.post("/new-teacher",AddNewTeacher);

module.exports = router;