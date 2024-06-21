const User = require("../Model/User");
const userservice = require("../Services/Signup");

async function createdUser(req, res) {
  try {
    console.log("here user",req.body)
    const userdata = req.body;
    console.log("the new",userdata)
    const user = await userservice.createUser(userdata);
    console.log("the seconf 9 ",user)
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
}

async function getuser(req, res) {
  try {
    const users = await User.find(); // Await the User.find() operation
    res.json({ users }); // Respond with the found users
  } catch (err) {
    res.status(400).json({ message: "No users found" }); // Corrected the JSON object syntax and added status code
  }
}

module.exports = { createdUser, getuser }; // Export both functions
