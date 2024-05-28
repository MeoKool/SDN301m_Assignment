const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const authWatches = require("./routes/watch");
const bodyParser = require("body-parser");
const multer = require("multer");

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
//Router API
app.use("/v1/auth", authRoutes);
app.use("/v1/watch", authWatches);

//Render
app.get("/", (req, res) => {
  res.render("homepage");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/HomePage", (req, res) => {
  res.render("homepage");
});
app.get("/CreateWatches", (req, res) => {
  res.render("createWatch");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
