const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema(
  {
    brandName: { type: String },
    watches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Watches",
      },
    ],
  },
  { timestamps: true }
);

module.exports = brandsSchema;
