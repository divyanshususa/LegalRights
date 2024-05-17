const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("application/pdf") ||
    file.mimetype.startsWith("application/msword") ||
    file.mimetype.startsWith(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
  ) {
    cb(null, true);
  } else {
    cb(new Error("File format not supported"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
