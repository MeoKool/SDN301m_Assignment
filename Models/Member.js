const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    membername: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", userSchema);
