const express = require("express");
const app = express();
const Port = 8000;
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose
  .connect("mongodb://localhost:27017/blogger")
  .then((e) => console.log("MongoDb Connected"));

const userRoutes = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkforcookie } = require("./middlewares/authentication");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforcookie("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoute);

app.listen(Port, () => console.log("Connected to Server"));
