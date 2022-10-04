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
  // const emailText = `<b>iLandio Tě vítá!</b> <br><br> Pevně věřím, že ti projekt pomůže na tvé programátorské cestě a získáš díky němu nejen mnoho užitečných informací, ale i přátel. <br><br>Krásný den přeje <br> <b>Jakub</b>`;

  // require("dotenv").config();
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.seznam.cz",
  //   auth: {
  //     user: "info@ilandio.cz",
  //     pass: process.env.PASSWORD,
  //   },
  // });

  // const mailOptions = {
  //   from: "info@ilandio.cz",
  //   to: email,
  //   subject: "Vítej v iLandiu ",
  //   html: emailText,
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });

  if (req.session) {
    req.session.destroy();
  }
  res.status(200).render("account-confirmed");
});

module.exports = router;
