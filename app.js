require("dotenv").config();
const express = require("express");
const app = express();
const Port = process.env.PORT || 8000;
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");

mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDb Connected"));

const userRoutes = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkforcookie } = require("./middlewares/authentication");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforcookie("token"));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}); // "-" means descending

  res.render("home", {
    user: req.user,
    blogs: allBlogs,
    profileImageUrl: `/images/default.png`,
  });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoute);

app.listen(Port, () => console.log("Connected to Server", process.env.PORT));
