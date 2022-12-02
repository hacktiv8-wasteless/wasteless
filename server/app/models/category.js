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
      return category;
    } catch (error) {
      console.log(error);
    }
  }
  static async insertOne(value) {
    try {
      const category = await Category.getCollection().insertOne(value);
      return category;
    } catch (error) {
      console.log(error);
    }
  }
  static async findOne(id) {
    try {
      const categoryID = await Category.getCollection().findOne({
        _id: ObjectId(id),
      });
      return categoryID;
    } catch (error) {
      console.log(error);
    }
  }
  static async update(id, value) {
    try {
      const updateCategory = await Category.getCollection().update(
        {
          _id: ObjectId(id),
        },
        {
          value,
        }
      );
      return updateCategory;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteOne(id) {
    try {
      const deleteOne = await Category.getCollection().deleteOne({
        _id: ObjectId(id),
      });
      return deleteOne;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Category;
