const router = require("express").Router();

const UserController = require("../controllers/userController");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.patch("/editname/:id", UserController.editName);
router.patch("/editusername/:id", UserController.editUserName);
router.patch("/editemail/:id", UserController.editEmail);
router.patch("/editpassword/:id", UserController.editPassword);
router.delete("/deleteuser/:id", UserController.deleteUser);

module.exports = router;
