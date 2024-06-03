const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    rating: { type: Number, min: 1, max: 5, require: true },
    content: { type: String, require: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = commentSchema;
