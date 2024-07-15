const mongoose = require("mongoose");

const ForumSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: [true, "Forum must have a name"] },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Forum", ForumSchema);
