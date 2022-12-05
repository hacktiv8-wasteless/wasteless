const router = require("express").Router();
const post = require("./post");
const category = require("./category");
const search = require("./search");

router.use("/posts", post);
router.use("/categories", category);
router.use("/search", search);

module.exports = router;
