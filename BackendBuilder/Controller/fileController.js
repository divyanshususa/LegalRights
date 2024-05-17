const File = require("../Model/File");

// Create new file record
exports.createFile = async (req, res) => {
  try {
    const { originalname, path, mimetype } = req.file;
    const file = await File.create({
      name: originalname,
      path,
      contentType: mimetype,
    });
    res.status(201).json({ file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all files
exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single file by ID
exports.getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.status(200).json({ file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a file by ID
exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
