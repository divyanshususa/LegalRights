const authService = require("../Services/Login");
const bcrypt = require("bcrypt");
const User = require("../Model/User");
const { generateToken } = require("../Util/jwtutils"); // Correct import statement

async function login(email, password) {
  try {
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
      throw new Error("User Not Found");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );


    if (!isPasswordValid) {
      throw new Error("Incorrect Password");
    }
    
    const token = await generateToken(existingUser); // Correctly calling the function
  
  return {
    token,
    role: existingUser.role, 
    user:existingUser// Assuming the role is stored in the existing user object
  };
  } catch (err) {
    throw new Error("Invalid Credentials"); // This line seems to be causing the issue
  }
}

module.exports = {
  login,
};

