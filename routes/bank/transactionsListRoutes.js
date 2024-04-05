const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");
const Admin = require("../../schemas/AdminSchema");

router.get("/", async (req, res, next) => {
  const adminAccount = await Admin.findById("660ebae2c0d98cd9c3b0a49c");

  const valueTransactions = adminAccount.valueTransactions;
  const dateTransactions = adminAccount.dateTransactions;
  const senderTransactions = adminAccount.senderTransactions;
  const receiverTransactions = adminAccount.receiverTransactions;

  const data = {
    errorMessage: "",
    dateTransactions: dateTransactions,
    valueTransactions: valueTransactions,
    senderTransactions: senderTransactions,
    receiverTransactions: receiverTransactions,
  };

  res.status(200).send(data);
});

module.exports = router;
