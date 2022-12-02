const router = require("express").Router();
const post = require("./post");
const category = require("./category");

router.use("/posts", post);
router.use("/categories", category);

module.exports = router;
