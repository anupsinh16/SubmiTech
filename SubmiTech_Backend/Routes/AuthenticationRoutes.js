const express = require("express");

const {authenticateStudent} = require("../Controllers/AuthenticationController");

const router = express.Router();

router.get("/student",authenticateStudent);
module.exports = router;
