const express = require(`express`);
const Controller = require("../controllers/transactionController");
const router = express.Router();

router.post(`/`, Controller.create);
router.get(`/:id`, Controller.get);

module.exports = router;