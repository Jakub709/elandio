const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res, next) => {
  try {
    //const start = Date.now();
    const loggedinUserID = req.session.user._id;
    const userProfile = await User.findById(loggedinUserID);

    res.status(200).render("user-profile", {
      userProfile: userProfile,
      loggedinUserEqualsClicked: "disabled-button",
    });
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
