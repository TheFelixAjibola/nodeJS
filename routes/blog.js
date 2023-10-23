const express = require("express");
const router = express.Router();
const blog = require("../controllers/blog");

router.get("/", blog.Index);

router.post("/", blog.Post);

router.get("/create", blog.Create);

router.get("/:id", blog.Details);

router.delete("/:id", blog.Delete);

module.exports = router;
