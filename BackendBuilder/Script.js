const User = require("./Model/User");
const bcrypt = require("bcrypt");

async function createAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (!existingAdmin) {
      const newAdmin = new User({
        email: "admin@gmail.com",
        firstName: "Admin",
        lastName: "Admin",
        password: await bcrypt.hash("admin", 10),
        role: "admin",
      });
      await newAdmin.save();
    } else {
      console.log("Admin already present");
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = createAdmin;
