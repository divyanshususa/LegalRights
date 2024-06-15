const express = require("express");
const { login } = require("../Controller/Login");

const router = express.Router();

router.post("/auth", login);

module.exports = router;
