const db = require("../config");

class User {
  static create = async (payload) => {
    try {
      return await db.create(payload);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = User;
