const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/");

const authentication = async (req, res, next) => {
	try {
		console.log(req.headers);
		const { access_token } = req.headers;
		console.log(access_token);
		// console.log(id);

		// console.log(access_token)
		const payload = verifyToken(access_token);
		// console.log(payload)
		const user = await User.findByPk(payload.id);
		req.user = {
			id: user.id,
		};
		// console.log(user)
		next();
	} catch (error) {
		next(error);
	}

};

module.exports = authentication;
