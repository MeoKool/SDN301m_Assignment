const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    memberName: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 50,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      match: [/^[a-zA-Z\s]+$/, "is invalid"],
    },
    yob: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v < new Date();
        },
        message: "Year of birth cannot be in the future!",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
