const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
require("dotenv").config();

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
  to: "v.solnickova@seznam.cz",
  subject: "iLandio | Změna hesla",
  text: "Nazdar 2",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
