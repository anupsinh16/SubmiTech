const express = require("express");
const{FetchTeacherInfo, UpdateStatus, FetchStudentList,AddExtraAssignment} = require("../Controllers/TeacherController");

const router = express.Router();

router.get("/labs",FetchTeacherInfo);
router.post("/updateStat",UpdateStatus);
router.get("/labstudents",FetchStudentList);
router.post("/addExtraAssignment", AddExtraAssignment);


module.exports = router;