const { default: mongoose } = require("mongoose");
const userSchema = require("../models/user");

// Create User
exports.createUser = async (req, res) => {
  try {
    newUser = await userSchema.create(req.body);
    res.status(200).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// LoginUser

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({
      success: false,
      message: "Please Enter email address and Password",
    });
    return;
  }
  const user = await userSchema.findOne({ email }).select("+password");
  if (!user) {
    res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  } else {
    const isMatch = await user.matchPassword(password);
    if (isMatch) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  }
};

// GET ALL USER

exports.getUsers = async (req, res) => {
  const users = await userSchema.find();
  res.status(200).json({
    success: true,
    users,
  });
};

// Update Password

exports.updatePassword = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      success: false,
      message: "No user Exists",
    });
  } else {
    try {
      await userSchema.findByIdAndUpdate(id, body, {
        new: true,
      });
      res.status(200).json({
        success: true,
        message: "password Updated",
      });
    } catch (error) {
      res.status(400).json({
        success: true,
        message: "password Not Updated",
      });
    }
  }
};
