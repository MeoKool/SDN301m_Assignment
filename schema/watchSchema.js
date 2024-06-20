const mongoose = require("mongoose");
const commentSchema = require("../schema/commentSchema");

const watchSchema = new mongoose.Schema(
  {
    watchName: {
      type: String,
      required: [true, "Watch name is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be at least 1"],
    },
    Automatic: { type: Boolean, default: false },
    watchDescription: {
      type: String,
      required: [true, "Watch description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    comments: [commentSchema],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
      required: [true, "Brand is required"],
    },
  },
  { timestamps: true }
);

module.exports = watchSchema;
