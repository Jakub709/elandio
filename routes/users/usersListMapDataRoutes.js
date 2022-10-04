const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");

router.get("/", async (req, res, next) => {
  // const updatedUser = await User.findById(req.session.user._id);
  const start = Date.now();
  console.log(start);
  const usersData = await User.find();
  res.status(200).send(usersData);
});

module.exports = router;
