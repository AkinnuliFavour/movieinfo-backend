const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    admin: {
      type: Boolean,
      required: [true, "Verify Admin Status"],
    },
    forum: [{ type: mongoose.Schema.Types.ObjectId, ref: "Forum" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Watchlist" }],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
