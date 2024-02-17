const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    // const updatedUser = await User.findById(req.session.user._id);
    const getData = {
      userLoggedIn: req.session.user,
      errorMessage: "",
    };
    res.status(200).send(getData);
  } catch (err) {
    res.status(404).send({
      userLoggedIn: req.session.user,
      errorMessage: "",
    });
  }
});

module.exports = router;
