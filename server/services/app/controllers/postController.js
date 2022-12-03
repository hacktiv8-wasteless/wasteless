const Post = require("../models/post");

class PostController {
  static async getAllPost(req, res) {
    try {
      const result = await Post.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  static async getPostById(req, res) {
    try {
      const { id } = req.params;
      const result = await Post.findById(id);
      if (!result) {
        return res.status(404).json({ message: "Post Not Found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  static async createPost(req, res) {
    try {
      const { title, decription, mainImage, quantity, string } = req.body;

      const newPost = {
        title,
        decription,
        mainImage,
        quantity,
        string,
      };
      await Post.created(newPost);

      res.status(201).json(Post);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, decription, mainImage, quantity, string } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

      const updatedPost = {
        title,
        decription,
        mainImage,
        quantity,
        string,
        _id: id,
      };
      await Post.findByIdAndUpdate(id, updatedPost, { new: true });
      res.status(200).json({ msg: "update success" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  static async deletePost(req, res) {
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

module.exports = PostController;
