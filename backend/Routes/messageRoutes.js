const router = require("express").Router();
const protect = require("../middleware/userAuthmiddleware");
const {sendMessage, fetchMessage}=require('../Controller/messageController')
router.post("/", protect,sendMessage)
  .get("/:chatId",protect,fetchMessage);
module.exports = router;
