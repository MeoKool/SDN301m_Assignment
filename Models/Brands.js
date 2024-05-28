const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema(
  { brandName: String },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandsSchema);
