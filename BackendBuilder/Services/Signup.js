const User = require("../Model/User");
const bcrypt = require("bcrypt");

async function createUser(userData) {
  const { firstName, lastName, email, password, role } = userData;
  console.log(userData, "this is role  = ",role);


  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: role || "customer",
  });
  console.log("this is new 17 ", createdUser)

  const savedUser = await createdUser.save();
  return savedUser;
}

module.exports = { createUser };
