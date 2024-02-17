const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const User = require("../../schemas/UserSchema");

router.get("/:id", async (req, res) => {
  try {
    const start = Date.now();
    const userProfile = await User.findById(req.params.id);
    const loggedInUserProfile = req.session.user;
    const millis = Date.now() - start;
    console.log(millis);
    res.status(200).send({
      userProfile: userProfile,
      loggedInUserProfile: loggedInUserProfile,
    });
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
