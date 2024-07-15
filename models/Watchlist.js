const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      required: [true, "user is required"],
    },
    url: {
      type: String,
      required: [true, "url of movie is required"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Watchlist", watchlistSchema);
