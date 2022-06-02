const express = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  updatePassword,
} = require("../controllers/user");
const { GenerateAadhar } = require("../middleware/generateAadhar");
const router = express.Router();

router.get("/user", (req, res) => {
  res.send("THis route is working");
});

router.post("/user", GenerateAadhar, createUser);
router.route("/user/login").post(loginUser);
router.route("/users").get(getUsers);
router.route("/user/:id").put(updatePassword);

module.exports = router;
