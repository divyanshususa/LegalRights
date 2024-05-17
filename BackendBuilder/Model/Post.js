const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
  
  },
});

module.exports = mongoose.model("Post", PostSchema);
