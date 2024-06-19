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
    type: mongoose.Schema.Types.ObjectId,
    
  },
  Templeate: {
    type: Boolean,
    default: "false",
  },
  Name: {
    type: String,
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post; 
  



