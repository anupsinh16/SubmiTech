const express = require("express");
const{FetchTeacherInfo, UpdateStatus, FetchStudentList} = require("../Controllers/TeacherController");

const router = express.Router();

router.get("/labs",FetchTeacherInfo);
router.post("/updateStat",UpdateStatus);
router.get("/labstudents",FetchStudentList);

module.exports = router;