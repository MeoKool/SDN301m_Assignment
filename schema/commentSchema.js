const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    content: {
      type: String,
      required: [true, "content is required."],
      minlength: 1,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
      validate: {
        validator: async function (value) {
          const count = await mongoose
            .model("Member")
            .countDocuments({ _id: value });
          return count > 0;
        },
        message: "Member not found",
      },
    },
  },
  { timestamps: true }
);

module.exports = commentSchema;
