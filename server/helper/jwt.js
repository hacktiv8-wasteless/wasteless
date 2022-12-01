const jwt = require("jsonwebtoken");

const signToken = (payload) => {
	return jwt.sign(payload, process.env.SECRET_KEY || "placeholder");
};
const verifyToken = (token) => {
	return jwt.verify(token, process.env.SECRET_KEY || "placeholder");
};

module.exports = { signToken, verifyToken };
