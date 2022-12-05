const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthorized", message: "Missing token" };
    }
    const payload = verifyToken(access_token, process.env.SECRET);
    const user = await User.findByPk(+payload.id);
    if (!user) throw { name: "Unauthorized", message: "Invalid token" };

    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
