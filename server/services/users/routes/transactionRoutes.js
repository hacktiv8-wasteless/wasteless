const express = require(`express`);
const Controller = require("../controllers/transactionController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.use(authentication)
router.post(`/`, Controller.create);
router.get(`/:id`, Controller.get);

module.exports = router;