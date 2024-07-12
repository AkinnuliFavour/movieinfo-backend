const express = require("express");
const router = express.Router();
const messageController = require("../controllers/MessageController");

router
  .route("/")
  .get(messageController.getAllMessages)
  .post(messageController.createMessage)
  .put(messageController.updateMessage)
  .delete(messageController.deleteMessage);

module.exports = router;
