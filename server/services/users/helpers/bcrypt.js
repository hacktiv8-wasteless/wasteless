const bcrypt = require("bcryptjs");
const salt = pocess.env.SALT || 6


const hashPassword = (password) => bcrypt.hashSync(password, salt);
// const comparePassword = (hash, password) => bcrypt.compareSync(password, hash);

module.exports = { hashPassword, comparePassword };