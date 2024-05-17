const express = require("express");
const router = express.Router(); 

const signupcontroller = require("../Controller/Signup");

router.post("/register", signupcontroller.createdUser); 
router.get("/", signupcontroller.getuser);
module.exports = router; 
