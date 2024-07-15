const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const messageSchema = new mongoose.Schema(
  {
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: {
      type: String,
      required: [true, "Content is required"],
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

module.exports = mongoose.model("Message", messageSchema);
