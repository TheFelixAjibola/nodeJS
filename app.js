const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoute = require("./routes/blog");

//express app
const app = express();

//Database URL Connection to MongoDB
const dbURL =
  "mongodb+srv://felix:qwerty123@nodetuts.qsuftsz.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// basic routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// app routes
app.use("/blogs", blogRoute);

// 404 Page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
