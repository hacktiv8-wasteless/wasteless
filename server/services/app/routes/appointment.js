const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

router.post("/:postId", appointmentController.create);
router.get("/", appointmentController.all);

module.exports = router;
