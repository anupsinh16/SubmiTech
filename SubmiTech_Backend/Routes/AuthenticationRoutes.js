const express = require("express");

const {authenticateStudent} = require("../Controllers/AuthenticationController");

const router = express.Router();

router.get("/authstud",authenticateStudent);
module.exports = router;
