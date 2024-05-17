const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
  contentType: String,
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
