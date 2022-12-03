const express = require(`express`);
const Controller = require("../controllers/usersController");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");

router.get(`/users`, Controller.getAllUsers);
router.get(`/users/:id`, Controller.getUserById);
router.post(`/users/login`, Controller.userLogin);
router.post(`/users/register`, Controller.userRegister);
router.patch(`/users/:id`)

module.exports = router;