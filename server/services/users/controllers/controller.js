const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
	static async getAllUsers(req, res, next) {
		try {
			const users = await User.findAll();

			return res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	}

	static async getUserById(req, res, next) {
		const { id } = req.params;
		try {
			const user = await User.findByPk(id);

			return res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	static async userRegister(req, res, next) {
		const { username, email, password, phoneNumber, address } = req.body;
		try {
			const newUser = User.create({
				username,
				email,
				password,
				phoneNumber,
				address,
			});

			res.status(201).json({
				newUser,
			});
		} catch (error) {
			next(error);
		}
	}

	static async userLogin(req, res, next) {
		const { email, password } = req.body;
		try {
			const foundUser = await User.findOne({ where: { email } });

			if (!foundUser || !comparePassword(foundUser.password, password)) {
				throw { message: "Invalid Email or Password" };
			}

			const access_token = signToken({ id: foundUser.id });

			return res.status(200).json(access_token);
		} catch (error) {
			next(error);
		}
	}

	// static async template() {

	// }
}

module.exports = Controller;
