const mongoose = require("mongoose");

commentSchema = new mongoose.Schema(
  {
    rating: { type: Number, min: 1, max: 3, require: true },
    content: { type: String, require: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Members",
      require: true,
    },
  },
  { timestamps: true }
);