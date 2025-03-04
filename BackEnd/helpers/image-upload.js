const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

function uploadMiddleware(folderName) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `${folderName.trim()}`,
      public_id: (req, file) => {
        `${file.fieldname} - ${Date.now()}`;
      },
      resource_type: "auto",
    },
  });
  return multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limita o tamanho do arquivo para 1MB
  });
}

module.exports = uploadMiddleware;
