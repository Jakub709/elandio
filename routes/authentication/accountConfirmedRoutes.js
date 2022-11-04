const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");
const dotenv = require("dotenv");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/:id", async (req, res, next) => {
  const acctivatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      acctivated: "yes",
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (req.session) {
    req.session.destroy();
  }
  res.status(200).render("account-confirmed");
});

module.exports = router;
