const express = require(`express`);
const Controller = require("../controllers/usersController");
const router = express.Router();

router.get(`/`, Controller.getAllUsers);
router.get(`/:id`, Controller.getUserById);
router.post(`/login`, Controller.userLogin);
router.post(`/register`, Controller.userRegister);

module.exports = router;