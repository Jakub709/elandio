const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res, next) => {
  res.status(200).render("reset-pass");
});

router.post("/", async (req, res, next) => {
  try {
    const encryptedPassword = req.body.id;
    const password = req.body.password;
    const passwordConf = req.body.passwordConf;
    const passwordLength = password.length;

    const user = await User.findOne({ password: encryptedPassword });
    // Pokud uživatel existuje, tak...test hesla
    if ((user != null) & (password === passwordConf) & (passwordLength >= 6)) {
      const newPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findOneAndUpdate(
        { password: encryptedPassword },
        {
          password: newPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).send({
        errorMessage: "",
        status: "success",
      });
    } else {
      res.status(201).send({
        errorMessage:
          "Hesla musí obsahovat alespoň 6 znaků, kód opište z emailu.",
        status: "fail",
      });
    }
  } catch (err) {
    res.status(404).send({
      errorMessage: "Chyba, zkuste to prosím znovu.",
      status: "fail",
    });
  }
});

module.exports = router;
