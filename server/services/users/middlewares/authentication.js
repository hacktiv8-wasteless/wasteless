const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    const payload = verifyToken(access_token, process.env.SECRET);
    const user = await User.findByPk(+payload.id);
    console.log(user, "<<<< ini dari autentication");
    if (!user) throw { name: "Unauthorized" };

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
