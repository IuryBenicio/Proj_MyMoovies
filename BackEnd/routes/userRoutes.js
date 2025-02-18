const router = require("express").Router();

const UserController = require("../controllers/userController");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.patch("/edit/:id", UserController.editUser);
router.patch("/editpassword/:id", UserController.editPassword);
router.delete("/deleteuser/:id", UserController.deleteUser);

module.exports = router;
