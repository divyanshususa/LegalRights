const Post = require("../Model/Post");

// Create a Post
module.exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    return res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
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
