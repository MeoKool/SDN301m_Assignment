const mongoose = require("mongoose");

const watcheSchema = new mongoose.Schema(
  {
    watchName: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    Automatic: { type: Boolean, default: false },
    watchDescription: { type: String, require: true },
    comments: [commentSchema],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
      require: true,
    },
  },
  { timestamps: true }
);