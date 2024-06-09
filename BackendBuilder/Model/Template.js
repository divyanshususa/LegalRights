const mongoose = require("mongoose");

// Assuming you have a User model defined somewhere
const User = require("./User"); // Adjust the path as needed

const TemplateSchema = new mongoose.Schema({
  descriptions: {
    type: String
  },
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
  Templeate: {
    type: Boolean,
    default: "true",
  },
  Name: {
    type: String,
  },
});

const Template = mongoose.model("Template", TemplateSchema);
module.exports = Template;
