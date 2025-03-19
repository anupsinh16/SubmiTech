const express = require("express");

const {authenticateStudent, authenticateTeacher, authenticateAdmin} = require("../Controllers/AuthenticationController");

const router = express.Router();

router.get("/authstud",authenticateStudent);
router.get("/authteacher",authenticateTeacher);
router.get("/authadmin",authenticateAdmin);
module.exports = router;
