const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  { brandName: String },
  { timestamps: true }
);
