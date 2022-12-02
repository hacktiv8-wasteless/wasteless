const CategoryController = require("../controllers/categoryController");
const router = require("express").Router();

router.get("/", CategoryController.readAllCategory);
router.post("/", CategoryController.addCategory);

module.exports = router;
