const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.route("/").get(articleController.fetchArticle);

module.exports = router;
