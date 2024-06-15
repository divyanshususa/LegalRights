const Post = require("../Model/Post");
const express = require("express")

const router = express.Router()
// Create a Post
module.exports.createPost = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the request body for debugging
    const { description, Name ,userId} = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    if (!Name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newPost = new Post({
      description,
      userId,
      Name,

    }); // Assuming req.userId is set by authentication middleware
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all Posts
module.exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving posts" });
  }
};

module.exports.getPostByName = async (req, res) => {
  try {
    console.log("Searching post by name:", req.params.Name);
    
    const post = await Post.findOne({ Name: req.params.Name });

    if (!post || post.Templeate!=true) {
      return res.status(404).json({ message: "Template not found" });
    }
    console.log(post.Templeate);
    return res.status(200).json({ post });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving post" });
  }
};


// Get a single Post by ID
module.exports.getPostById = async (req, res) => {
    try {
        console.log(req.params.id);
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ post });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving post" });
  }
};
//ipdate by name

module.exports.updatePostByName = async (req, res) => {
  try {
    console.log(req.params.Name);
    const post = await Post.findOne({ Name: req.params.Name });
    
   if (!post || post.Templeate != true) {
     return res.status(404).json({ message: "Template not found" });
   }
    Object.assign(post, req.body);
    await post.save();
    return res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Update a Post
module.exports.updatePost = async (req, res) => {
    try {
       console.log(req.params.id);
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    Object.assign(post, req.body);
    await post.save();
    return res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a Post
module.exports.deletePost = async (req, res) => {
    try {
       console.log(req.params.id);
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
   
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
