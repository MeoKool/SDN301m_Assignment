const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const authWatches = require("./routes/watch");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/sdn301m")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Router
app.use("/v1/auth", authRoutes);
app.use("/v1/watch", authWatches);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
