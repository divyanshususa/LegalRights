const express = require("express");
const postController = require("../Controller/Post"); // adjust the path as needed
const router = express.Router();

router.post("/posts", postController.createPost);
router.get("/posts", postController.getPosts);
router.get("/posts/:Name", postController.getPostByName);
router.put("/posts/:Name", postController.updatePostByName); 
router.get("/posts/:id", postController.getPostById);

router.put("/posts/:id", postController.updatePost); 
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
