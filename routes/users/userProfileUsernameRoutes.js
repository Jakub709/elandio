const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/:username", async (req, res, next) => {
  try {
    const clickedUsername = req.params.username;
    const userProfile = await User.findOne({ username: clickedUsername });
    const userTransactions = {
      moneyTransfer: userProfile.moneyTransfer,
      dateTransfer: userProfile.dateTransfer,
      usernameTransfer: userProfile.usernameTransfer,
      nameTransfer: userProfile.nameTransfer,
    };
    console.log(userTransactions);

    res.status(200).render("user-profile", {
      userProfile: userProfile,
      userTransactions: userTransactions,
    });
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
