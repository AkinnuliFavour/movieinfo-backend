const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "url of movie is required"],
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
