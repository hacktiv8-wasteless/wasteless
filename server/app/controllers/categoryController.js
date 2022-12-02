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
  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const categoryId = await Category.findOne();
      res.status(200).json(categoryId);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const updateCategory = await Category.update();
      res.status(200).json(updateCategory);
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const deleteCategory = await Category.deleteOne();
      res.status(200).json({ msg: "success delete" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
}

module.exports = CategoryController;
