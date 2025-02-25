const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req) => {
    return {
      public_id: `user_ ${req.body.userName}`,
      folder: "mymovies/user_profile",
      transformation: [{ width: 500, height: 500, crop: "fill" }],
      allowed_formats: ["jpg", "png", "jpeg"],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
