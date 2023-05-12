const routes = require("express").Router();
const protect = require("../middleware/userAuthmiddleware");
const {
  accesschat,
  fetchchat,
  creategroup,
  renamegroup,
  removegroup,
  addtogroup,
} = require("../Controller/chatcontroller");
routes
  .post("/", protect, accesschat)
  .get("/", protect, fetchchat)
  .post("/creategroup", protect, creategroup)
  .put("/renamegroup", protect, renamegroup)
  .put("/addtogroup", protect, addtogroup)
  .put("/removegroup", protect, removegroup);
module.exports = routes;
