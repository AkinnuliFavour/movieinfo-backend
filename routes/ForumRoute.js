const express = require("express");
const router = express.Router();
const forumController = require("../controllers/ForumController");
const userVerification = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

router
  .route("/")
  .get(userVerification, forumController.getForums)
  .post(userVerification, isAdmin, forumController.createForum);

module.exports = router;
