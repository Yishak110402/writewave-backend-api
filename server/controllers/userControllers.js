const User = require("./../models/userModel");
const Post = require("./../models/postModel");
const fs = require("fs")
const path = require("path")

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(req.params.id.length);
    if (!user || user.length === 0 || req.params.id.length !== 24) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $match: { createdBy: req.params.id },
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
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Error Fetching Data",
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    const deletedPosts = await Post.deleteMany({ createdBy: req.params.id });
    if (deletedUser.length == 0) {
      return res.json({
        status: "fail",
        message: "No User found with that ID",
      });
    }

    fs.unlink(path.resolve(__dirname, `./../public/profiles/${deletedUser.profilePicture}`) , (err)=>{
      if(err){
        console.log(err);
      }
    })
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.confirmUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user || user.length === 0 || req.params.id < 24) {
    return res.json({
      status: "fail",
      message: "User not found",
    });
  }
  next();
};

exports.addProfilePic = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    profilePicture: req.file.filename,
  });
  res.status(200).json({ 
    status: "success",
    message: "Profile uploaded",
    picture: req.file.filename
  });
};
