const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.post("/", async (req, res) => {
  try {
    const password = req.body.password;
    const passwordConf = req.body.passwordConf;
    const passwordLength = password.length;

    if ((password === passwordConf) & (passwordLength >= 6)) {
      const newPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findByIdAndUpdate(
        req.session.user._id,
        {
          password: newPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      req.session.user = updatedUser;
      res.status(201).send({
        userLoggedIn: updatedUser,
        errorMessage: "",
        status: "success",
      });
    } else {
      res.status(201).send({
        userLoggedIn: req.session.user,
        errorMessage: "Hesla musí být stejná a mít alespoň 6 znaků.",
        status: "fail",
      });
    }
  } catch (err) {
    res.status(404).send({
      userLoggedIn: req.session.user,
      errorMessage: "Chyba, zkus to prosím znovu.",
      status: "fail",
    });
  }
});

module.exports = router;
