const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res, next) => {
  res.status(200).render("reset-pass-email");
});

router.post("/", async (req, res, next) => {
  try {
    const email = req.body.email.trim();

    const user = await User.findOne({ email: email });
    // Pokud uživatel existuje, tak...test hesla
    //console.log(user);
    if (user != null) {
      //console.log(user._id);
      const emailCode = user.password;
      //console.log(emailCode);
      const emailText = `<b>iLandio Ti posílá odkaz pro změnu hesla!</b> <br><br> Stačí kliknout na tento <a href=https://ilandio.cz/reset-pass> odkaz</a> a použít následující kód:<br> <span style="background-color:#EFF1F7;">${emailCode}</span> <br><br>Krásný den přeje <br> <b>Jakub</b>`;

      // Nodemailer - odeslání emailu
      require("dotenv").config();
      const transporter = nodemailer.createTransport({
        host: "smtp.seznam.cz",
        auth: {
          user: "info@ilandio.cz",
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: "info@ilandio.cz",
        to: email,
        subject: "iLandio | Změna hesla",
        html: emailText,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(200).send({
        errorMessage: "",
        status: "success",
      });
    } else {
      res.status(200).send({
        errorMessage: "Zadej prosím svůj platný email.",
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
