const PostController = require("../controllers/postController");
const router = require("express").Router();

router.get("/", PostController.getAllPost);
router.post("/", PostController.createPost);
router.get("/:id", PostController.getPostById);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
PostController;

module.exports = router;
