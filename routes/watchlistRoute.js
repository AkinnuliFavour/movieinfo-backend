const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlistController");
const auth = require("../middleware/authMiddleware");

router.route("/").get(auth, watchlistController.getWatchlist).post(auth, watchlistController.createWatchlist).delete(auth, watchlistController.deleteWatchlist);