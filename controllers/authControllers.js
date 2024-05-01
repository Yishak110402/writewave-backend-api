const User = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const validate = require("validator");
const sendVerificationEmail = require("./../utils/sendVerificationEmail");

exports.signup = async (req, res) => {
  console.log(req.body.email);
  try {
    const validEmail = validate.isEmail(req.body.email);
    if (validEmail === false) {
      return res.json({
        status: "fail",
        message: "Invalid email entered",
      });
    }
    console.log("Invalidness checked");
    const checkUser = await User.find({ email: req.body.email });
    if (checkUser.length !== 0) {
      return res.json({
        status: "fail",
        message: "Email already taken",
      });
    }
    console.log("Checked if email is free");
    if (req.body.password.length < 8) {
      return res.json({
        status: "fail",
        message: "Password should be longer than 8 characters",
      });
    }
    console.log("Password length checked");
    const user = await User.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Sign Up Successful",
      data: {
        user,
      },
    });
    console.log("User created");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please fill all required fields",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found with that email address",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid password",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        user,
      },
    });
  } catch (err) {}
};

exports.updateUserDetails = async (req, res) => {
  try {
    const userData = {};
    const mainUser = await User.findById(req.params.id).select("+password");
    if (!mainUser || mainUser.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No user with that ID",
      });
    }

    if (req.body.email) {
      if (!validate.isEmail(req.body.email)) {
        return res.json({
          status: "fail",
          message: "Invalid email entered",
        });
      }
      const user = await User.find({ email: req.body.email });
      if (user.length !== 0) {
        return res.status(400).json({
          status: "fail",
          message: "Email already taken",
        });
      }
      // mainUser.email = req.body.email
    }

    if (req.body.oldPassword || req.body.newPassword) {
      if (!req.body.oldPassword || !req.body.newPassword) {
        return res.status(404).json({
          status: "fail",
          message: "Please fill all the required fields",
        });
      }
      const validPassword = await bcrypt.compare(
        req.body.oldPassword,
        mainUser.password
      );
      if (!validPassword) {
        return res.status(400).json({
          status: "fail",
          message: "Please enter the correct password",
        });
      }
      if (req.body.newPassword.length < 8) {
        return res.status(400).json({
          status: "fail",
          message: "A password should be longer than 8 chars",
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);

      req.body.password = hashedPassword;
      req.body.oldPassword = undefined;
      req.body.newPassword = undefined;
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "Update successful",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.sendVerification = async (req, res) => {
  // console.log(req.body);
  try {
    const validEmail = validate.isEmail(req.body.email);
    if (validEmail === false) {
      res.json({
        status: "fail",
        message: "Please enter a valid email",
      });
    }
    const randomCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    console.log(randomCode);
    const mailSent = await sendVerificationEmail.sendVerificationEmail({
      name: req.body.name,
      email: req.body.email,
      verificationCode: randomCode
    })
    if (mailSent) {
      return res.json({
        status: "Success",
        message: "Email sent successfully",
        code: randomCode
      });
    } else {
      return res.json({
        status: "fail",
        message: "Failed to send",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
