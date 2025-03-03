const express = require("express");

const {FetchStudentStatus} = require("../Controllers/StudentController");

const router = express.Router();

router.get("/student",FetchStudentStatus);

module.exports = router;
