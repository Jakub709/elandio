const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    res.status(200).render("my-profile.pug", {
      userLoggedIn: req.session.user,
      errorMessage: "",
    });
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
