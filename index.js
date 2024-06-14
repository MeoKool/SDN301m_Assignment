const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const authWatches = require("./routes/watch");
const authBrand = require("./routes/brand");
const authComment = require("./routes/comment");
const bodyParser = require("body-parser");

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
app.use("/v1/brand", authBrand);
app.use("/v1/feedback", authComment);

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
app.get("/CreateWatches", (req, res) => {
  res.render("createWatch");
});
app.get("/details/:id", (req, res) => {
  const id = req.params.id;
  res.render("detailsWatch", { watchId: id });
});
app.get("/search/:name", (req, res) => {
  const name = req.params.name;
  res.render("searchWatch", { name: name });
});
app.get("/user", (req, res) => {
  res.render("userProfile");
});
app.get("/user/changePassword", (req, res) => {
  res.render("changePassword");
});
app.get("/getAllMember", (req, res) => {
  res.render("getAllMember");
});
app.get("/getWatchByBrand/:id", (req, res) => {
  const brandId = req.params.id;
  res.render("fillterByBrand", { id: brandId });
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
