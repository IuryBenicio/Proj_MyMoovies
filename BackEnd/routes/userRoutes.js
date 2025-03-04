const router = require("express").Router();

const UserController = require("../controllers/userController");
const uploadMiddleware = require("../helpers/image-upload");
const upload = uploadMiddleware("mymovies-profile");

router.post(
  "/register",
  upload.single("image"),
  (req, res, next) => {
    console.log();
    next();
  },
  UserController.registerUser
);
// router.patch("/uploadimage/:id");
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.patch("/editname/:id", UserController.editName);
router.patch("/editusername/:id", UserController.editUserName);
router.patch("/editemail/:id", UserController.editEmail);
router.patch("/editpassword/:id", UserController.editPassword);
router.delete("/deleteuser/:id", UserController.deleteUser);

module.exports = router;
