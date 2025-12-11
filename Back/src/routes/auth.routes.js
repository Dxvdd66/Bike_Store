const express = require("express");
const router = express.Router();
const errorControl = require("../middlewares/errorControl");
const { login, register } = require("../controllers/auth.controller");

router.post("/login", errorControl(login));
router.post("/register", errorControl(register));

module.exports = router;
