const mongoose = require("mongoose");
const bcyrpt = require("bcryptjs");

// minister -> _id, Number of votes/Cannot see who have voted,
// user -> Vote once

// enum as one of the validators

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
  role: {
    type: String,
    enum: ["user", "minister"],
    default: "user",
  },
  num_of_votes: {
    type: Number,
    default: function () {
      return this.role === "minister" ? 0 : undefined;
    },
    required: function () {
      return this.role === "minister" ? true : false;
    },
  },
  hasVoted: {
    type: Boolean,
    default: function () {
      return this.role === "user" ? false : undefined;
    },
    required: function () {
      return this.role === "user" ? true : false;
    },
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
  if (this._update.password) {
    this._update.password = await bcyrpt.hash(this._update.password, 10);
    next();
  }
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
