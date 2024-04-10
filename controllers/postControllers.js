const Post = require("./../models/postModel");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $sort: { createdAt: -1 },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (err) {}
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({
      status: "fail",
      message: "No post found with that id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
};

exports.createPost = async (req, res) => {
  try {
    req.body.createdAt = Date.now();
    req.body.lastEditted = Date.now();
    const post = await Post.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {}
};

exports.getUserPosts = async (req, res) => {
  try {
    const { creator } = req.params;
    const posts = await Post.aggregate([
      {
        $match: { createdBy: creator },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  } catch (err) {}
};
exports.editPost = async (req, res) => {
  try {
    req.body.lastEditted = Date.now();
    const post = await Post.findByIdAndUpdate(req.params.id, req.body);
    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "No user found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
