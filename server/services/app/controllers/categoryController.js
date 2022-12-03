const Category = require("../models/category");

class CategoryController {
  static async readAllCategory(req, res) {
    try {
      const result = await Category.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  static async addCategory(req, res) {
    try {
      const { name, price } = req.body;

      const newCategory = {
        name,
        price,
      };
      await Category.created(newCategory);

      res.status(201).json(Category);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const result = await Category.findById(id);
      if (!result) {
        return res.status(404).json({ message: "Category Not Found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No category with id: ${id}`);

      const updatedCategory = {
        name,
        price,
      };
      await Category.findByIdAndUpdate(id, updatedCategory, { new: true });
      res.status(200).json({ msg: "update success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
      await Post.findByIdAndRemove(id);
      res.status(200).json({ msg: "Post deleted successfully." });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
}

module.exports = CategoryController;
