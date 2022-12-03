const { verifyToken } = require("../helpers/jwt");

const authentication = (req, res, next) => {
	try {
		const { access_token } = req.headers;
		const { id } = verifyToken(access_token);
		console.log(access_token)
		console.log(id)
		req.user = {
			id,
		};
		next();
	} catch (error) {
        next(error)
    }
};

module.exports = authentication;