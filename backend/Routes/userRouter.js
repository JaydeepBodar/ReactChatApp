const router = require("express").Router();
const userController = require("../Controller/userController");
const protect = require("../middleware/userAuthmiddleware");
router
  .get("/", protect, userController.searchUser)
  .post("/register", userController.registeruser)
  .post("/login", userController.loginuser);
module.exports = router;
