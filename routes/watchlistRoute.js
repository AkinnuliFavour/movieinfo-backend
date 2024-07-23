const express = require("express");
const router = express.Router();
const watchListController = require("../controllers/watchListController");
const userVerification = require("../middleware/authMiddleware");

router.route("/")
.get(userVerification, watchListController.getAllWatchList).post(userVerification, watchListController.createWatchList).delete(userVerification, watchListController.deleteWatchList);

module.exports = router;