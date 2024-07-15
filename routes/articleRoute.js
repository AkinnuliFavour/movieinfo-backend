const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const userVerification = require("../middleware/authMiddleware");

router.route("/").get(userVerification, articleController.fetchArticle);

module.exports = router;
