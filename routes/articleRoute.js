const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const auth = require("../middleware/authMiddleware");

router.route("/").get(auth, articleController.fetchArticle);

module.exports = router;
