const express = require("express");
const router = express.Router();
const messageController = require("../controllers/MessageController");
const auth = require("../middleware/authMiddleware");

router
  .route("/")
  .get(auth, messageController.getAllMessages)
  .post(auth, messageController.createMessage)
  .put(auth, messageController.updateMessage)
  .delete(auth, messageController.deleteMessage);

module.exports = router;
