const express = require("express");
const postController = require("../Controller/Post"); // adjust the path as needed
const router = express.Router();

router.post("/Createposts", postController.createPost);
router.get("/GetAllposts", postController.getPosts);
router.get("/GetByIdposts/:id", postController.getPostById);
router.get("/getpostbyuserid/:id", postController.getPostsByUserId);

router.get("/getposts/:Name", postController.getPostByName);
router.put("/Updateposts/:Name", postController.updatePostByName); 


router.put("/UpdateByIdposts/:id", postController.updatePost); 
router.delete("/DeleteByIdposts/:id", postController.deletePost);

module.exports = router;
