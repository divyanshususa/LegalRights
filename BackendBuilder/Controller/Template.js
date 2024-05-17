const fs = require("fs");

const getFile = async (req, res) => {
  try {
    const filePath =
      "D:\\Builder\\BackendBuilder\\Template\\SaleDeedFinalFlat.pdf";
    const fileBuffer = fs.readFileSync(filePath);
    res.set("Content-Type", "application/octet-stream");
    res.send(fileBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getFile,
};
