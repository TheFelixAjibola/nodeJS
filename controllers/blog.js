const Blog = require("../models/blog");

const Index = (req, res) => {
  Blog.find()
    .sort({ createsAt: -1 })
    .then((result) => {
      res.render("blog/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
};

const Details = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("blog/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Blog Not Found" });
    });
};

const Create = (req, res) => {
  res.render("blog/create", { title: "Create" });
};

const Post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => res.redirect("/blogs"))
    .catch((err) => console.log(err));
};

const Delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => res.json({ redirect: "/blogs" }))
    .catch((err) => console.log(err));
};

module.exports = {
  Index,
  Details,
  Create,
  Post,
  Delete,
};
