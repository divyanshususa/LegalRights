const express = require("express");
const router = express.Router();
const fileController = require("../Controller/fileController");
const upload = require("../Uploads/multer");

// File upload route
router.post("/upload", upload.single("file"), fileController.createFile);

// Get all files route
router.get("/", fileController.getAllFiles);

// Get file by ID route
router.get("/:id", fileController.getFileById);

// Delete file by ID route
router.delete("/:id", fileController.deleteFile);

module.exports = router;
