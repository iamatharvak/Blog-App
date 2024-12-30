const express = require("express");
const app = express();
const Port = 8000;
const path = require("path");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/blogger")
  .then((e) => console.log("MongoDb Connected"));

const userRoutes = require("./routes/user");

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoutes);

app.listen(Port, () => console.log("Connected to Server"));
