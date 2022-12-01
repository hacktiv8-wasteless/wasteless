const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 6);
};
const comparePassword = (hash, password) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { hashPassword, comparePassword };
