const multer = require("multer");
const cloudinary = require("./cloudinaryConfig");

const deleteImage = async (oldImagePublicId) => {
  if (oldImagePublicId) {
    return await cloudinary.v2.uploader.destroy(oldImagePublicId);
  }
  return;
};

const updateProfileImage = async (req, res, next) => {
  const oldImagePublicId = req.body.profileImage.public_id;

  if (oldImagePublicId) {
    await deleteImage(oldImagePublicId).then(() => {
      next();
    });
  }

  next();
};

module.exports = updateProfileImage;
