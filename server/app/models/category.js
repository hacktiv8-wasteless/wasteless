const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongo");

class Category {
  static getCollection() {
    const db = getDatabase();
    // console.log(db, "ini db");
    return db.collection("Category");
  }

  static async find() {
    try {
      const category = await Category.getCollection().find().toArray();
    } catch (error) {
      console.log(error);
    }
  }
  static async insertOne(value) {
    try {
      const category = await Category.getCollection().insertOne(value);
    } catch (error) {
      console.log(error);
    }
  }
  //   static async findByPk(id) {
  //     try {

  //     } catch (error) {
  //      console.log(error);
  //     }
  //   }
}

module.exports = Category;
