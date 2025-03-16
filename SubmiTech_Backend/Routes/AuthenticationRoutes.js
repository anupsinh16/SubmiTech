const express = require("express");

const {authenticateStudent, authenticateTeacher} = require("../Controllers/AuthenticationController");

const router = express.Router();

router.get("/authstud",authenticateStudent);
router.get("/authteacher",authenticateTeacher);
module.exports = router;
