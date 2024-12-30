const express = require("express");
const app = express();
const Port = 8000;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(Port, () => console.log("Connected to Server"));



