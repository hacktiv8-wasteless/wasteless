const express = require(`express`);
const Controller = require("../controllers/usersController");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");
const usersRoutes = require("./usersRoutes")
const transactionRoutes = require("./transactionRoutes")

router.use(`/users`,usersRoutes)
router.use(`/transaction`,transactionRoutes)

router.use(errorHandler);

module.exports = router;
