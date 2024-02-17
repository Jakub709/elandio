const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");
const APIFeatures = require("../../utils/apiFeatures");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res, next) => {
  const notifications = req.session.user.notifications;
  const user = req.session.user;

  res
    .status(200)
    .render("notifications", { notifications: notifications, user: user });
});

router.post("/", async (req, res, next) => {
  try {
    // ID uživatele, který notifikaci odesílá
    const notificationSenderId = req.body.senderId;
    // ID uživatele, který notifikaci přijímá
    const notificationReceiverId = req.body.receiverId;
    const notificationUserFoto = req.body.foto;
    const notificationUserName = req.body.name;
    const notificationUserText = req.body.text;
    const notificationUserDate = req.body.date;

    console.log(notificationSenderId);
    console.log(notificationReceiverId);
    console.log(notificationUserFoto);
    console.log(notificationUserName);
    console.log(notificationUserText);
    console.log(notificationUserDate);
    const about = "nazdar2";

    const notificationReceiver = await User.findByIdAndUpdate(
      notificationReceiverId,
      {
        $push: {
          notifications: {
            id: notificationSenderId,
            foto: notificationUserFoto,
            name: notificationUserName,
            text: notificationUserText,
            date: notificationUserDate,
          },
        },
      }
    );

    // IS notifikace
    const email = notificationReceiver.email;
    console.log(email);
    if (notificationReceiver.isNotification == "povoleno") {
      const emailText = `<b>eLandio posílá upozornění!</b> <br><br> <a href=https://elandio.cz/user-profile/${notificationSenderId}>${notificationUserName}</a> ${notificationUserText} <br><br>Krásný den přeje <br> <b>Jakub z Elandia</b>`;

      require("dotenv").config();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "elandio.notifikace@gmail.com",
          pass: process.env.GMAILISNOTIFICATIONPASSWORD,
        },
      });

      const mailOptions = {
        from: "elandio.notifikace@gmail.com",
        to: email,
        subject: "eLandio posílá upozornění!",
        html: emailText,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      const result = "success";
      res.status(200).send(result);
    } else {
      const result = "success";
      res.status(200).send(result);
    }
  } catch {
    const result = "fail";
    res.status(400).send(result);
  }
});

module.exports = router;
