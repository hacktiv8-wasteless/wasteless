const { ObjectId } = require("mongodb");
const Post = require("../models/post");

class PostController {
  static async getAllPost(req, res) {
    const { category_id } = req.query;
    const options = {};
    try {
      // if (category_id) {
      //   options = {
      //     category_id: ObjectId(category_id),
      //   };
      // }
      // console.log("masuk sini")
      const result = await Post.find();
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async getPostById(req, res) {
    const { postId } = req.params;
    try {
      const result = await Post.findById(postId);
      // console.log(result, "ini result");
      if (!result) {
        return res.status(404).json({ message: "Post Not Found" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async createPost(req, res) {
    try {
      const { title, description, mainImage, quantity, status } = req.body;
      console.log(req.body);
      if (!title || !mainImage || !description || !quantity || !status) {
        return res.status(404).json({ message: "Invalid input" });
      }

      const postInput = { title, description, mainImage, quantity, status };
      const result = await Post.create(postInput);
      console.log(result);
      res.status(201).json({ message: "Success create post" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async updatePost(req, res) {
    try {
      const { postId } = req.params;
      // const { title, decription, mainImage, quantity, string } = req.body;
      const post = await Post.findById(postId);
      const updatedPost = {
        ...req.body,
      };
      const updatePost = await Post.findByIdAndUpdate(postId, updatedPost, {
        new: true,
      });
      res.status(200).json({ message: "update success" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  static async deletePost(req, res) {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId);
      const deletedPost = await Post.findByIdAndRemove(postId, {
        returnOriginal: true,
      });
      res.status(200).json({ message: "success delete" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = PostController;
