const multer = require("multer");
const path = require("path");
const uploads = path.join(__dirname, "..", "uploads");

// Configure storage: where and how to save files
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploads),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    console.log("extention==>", ext);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    console.log("uniquename===>", uniqueName);
    cb(null, uniqueName); // Save with unique name
  },
});

// Allow only image files
const fileFilter = (req, file, cb) => {
  const isImage = /jpeg|jpg|png|gif/.test(file.mimetype);
  if (isImage) cb(null, true);
  else cb(new Error("Only image files are allowed!"));
};

// Set up multer with storage, file filter, and size limit
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 2MB
});

module.exports = upload;
