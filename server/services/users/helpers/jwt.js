const jwt = require("jsonwebtoken");
// const secretKey = process.env.SECRET || "rahasia";

const signToken = (payload) => jwt.sign(payload, process.env.SECRET);
const verifyToken = (access_token) =>
  jwt.verify(access_token, process.env.SECRET);

module.exports = { signToken, verifyToken };
