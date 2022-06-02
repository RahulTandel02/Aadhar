const mongoose = require("mongoose");
const bcyrpt = require("bcryptjs");

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please Enter your First Name"],
  },
  last_name: {
    type: String,
    required: [true, "Please Enter your Last Name"],
  },
  phone: {
    type: Number,
    required: [true, "Please Enter your phone number"],
    unique: true,
    maxLength: [10, "Phone number cannot be greater than 10"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    select: false,
  },
  address: {
    type: String,
    required: [true, "Please Enter your email"],
  },
  aadhar: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcyrpt.genSalt(10);
  this.password = await bcyrpt.hash(this.password, salt);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  this._update.password = await bcyrpt.hash(this._update.password, 10);
  next();
});

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    console.log(error);
    next(new Error("Phone Number or Email must be unique"));
  } else if (error.name === "ValidationError") {
    console.log(error.message.split(":")[2]);
    next(new Error(error.message.split(":")[2]));
  } else {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (password) {
  return await bcyrpt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
