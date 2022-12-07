const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
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
