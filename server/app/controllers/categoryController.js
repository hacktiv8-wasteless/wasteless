const Category = require("../models/category");

class CategoryController {
  static async readAllCategory(req, res) {
    try {
      const category = await Category.find();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  static async addCategory(req, res) {
    try {
      const { name, price } = req.body;
      const addCategory = await Category.insertOne(req.body);
      res.status(200).json(addCategory);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
}

module.exports = CategoryController;
