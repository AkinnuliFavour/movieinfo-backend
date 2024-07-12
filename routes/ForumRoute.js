const express = require("express");
const router = express.Router();
const forumController = require("../controllers/ForumController");
const auth = require("../middleware/authMiddleware");

router
  .route("/")
  .get(forumController.getForums)
  .post(forumController.createForum);

module.exports = router;
