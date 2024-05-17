const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["admin", "user", "customer"], default: "customer" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
