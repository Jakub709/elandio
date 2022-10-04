const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");

router.get("/", async (req, res, next) => {
  // const updatedUser = await User.findById(req.session.user._id);
  const bankCoins = {
    userLoggedIn: req.session.user,
    errorMessage: "",
  };
  res.status(200).send(bankCoins);
});

router.post("/", async (req, res, next) => {
  try {
    // Odesílatel/Příjemce
    const usernameTransfer = req.body.usernameTransfer;
    const senderUsername = req.session.user.username;
    const nameTransfer = req.body.nameTransfer.trim();
    const moneyTransfer = Math.abs(req.body.moneyTransfer.trim() * 1);
    const updatedSender = await User.findById(req.session.user._id);

    const receiverConfirmed = await User.findOne({
      username: usernameTransfer,
    });
    if (!receiverConfirmed) {
      const noReceiver = {
        userLoggedIn: updatedSender,
        errorMessage: "Uživatelské jméno příjemce neexistuje",
        status: "fail",
      };
      res.status(200).send(noReceiver);
    } else if (!nameTransfer) {
      const noNameTransfer = {
        userLoggedIn: updatedSender,
        errorMessage: "Uveď prosím jméno příjemce",
        status: "fail",
      };
      res.status(200).send(noNameTransfer);
    } else if (!moneyTransfer) {
      const noMoneyTransfer = {
        userLoggedIn: updatedSender,
        errorMessage: "Uveď prosím částku",
        status: "fail",
      };
      res.status(200).send(noMoneyTransfer);
    } else if (moneyTransfer > updatedSender.accountBalance * 1) {
      const noMoney = {
        userLoggedIn: updatedSender,
        errorMessage: "Bohužel nemáš na účtě dostatek Educoinů",
        status: "fail",
      };
      res.status(200).send(noMoney);
    } else if (updatedSender.acctivated == "no") {
      const noMoney = {
        userLoggedIn: updatedSender,
        errorMessage:
          "Tvůj účet není aktivní. Přihlas se na email a aktivuj jej pomocí odkazu, který Ti byl při registraci odeslán. ",
        status: "fail",
      };
      res.status(200).send(noMoney);
    } else {
      //Update databáze
      const receiverDB = await User.findOneAndUpdate(
        { username: usernameTransfer },
        {
          $push: {
            moneyTransfer: moneyTransfer,
            nameTransfer: updatedSender.name,
            dateTransfer: new Date(),
            usernameTransfer: senderUsername,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      const senderDB = await User.findOneAndUpdate(
        { username: senderUsername },
        {
          $push: {
            moneyTransfer: -moneyTransfer,
            nameTransfer: nameTransfer,
            dateTransfer: new Date(),
            usernameTransfer: usernameTransfer,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      const success = {
        userLoggedIn: senderDB,
        errorMessage: "Platba proběhla v pořádku",
        status: "success",
      };
      req.session.user = senderDB;
      res.status(200).send(success);
    }
  } catch {
    const fail = {
      userLoggedIn: req.session.user,
      errorMessage: "Něco se pokazilo :-(",
      status: "fail",
    };
    res.status(200).send(fail);
  }
});

module.exports = router;
