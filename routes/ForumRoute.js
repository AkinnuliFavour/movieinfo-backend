const express = require("express");
const router = express.Router();
const forumController = require("../controllers/ForumController");
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdminMiddleware");

router
  .route("/")
  .get(auth, forumController.getForums)
  .post(auth, isAdmin, forumController.createForum);

module.exports = router;
