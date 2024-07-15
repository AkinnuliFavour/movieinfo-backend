const express = require("express");
const router = express.Router();
const messageController = require("../controllers/MessageController");
const userVerification = require("../middleware/authMiddleware");

router
  .route("/")
  .get(userVerification, messageController.getAllMessages)
  .post(userVerification, messageController.createMessage)
  .put(userVerification, messageController.updateMessage)
  .delete(userVerification, messageController.deleteMessage);

module.exports = router;
