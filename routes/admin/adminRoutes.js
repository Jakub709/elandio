const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Admin = require("../../schemas/AdminSchema");
const User = require("../../schemas/UserSchema");

const cron = require("node-cron");

app.use(bodyParser.urlencoded({ extended: false }));

// Dnešní datum
const currentDate = new Date();
const day = currentDate.getDay();

let dnesniDen;
if (day === 0) {
  dnesniDen = "neděle";
} else if (day === 1) {
  dnesniDen = "pondělí";
} else if (day === 2) {
  dnesniDen = "úterý";
} else if (day === 3) {
  dnesniDen = "středa";
} else if (day === 4) {
  dnesniDen = "čtvrtek";
} else if (day === 5) {
  dnesniDen = "pátek";
} else if (day === 6) {
  dnesniDen = "sobota";
}

d = currentDate.getDate();
m = currentDate.getMonth() + 1;
r = currentDate.getYear() + 1900;

const dnesniDatum = d + "." + m + "." + r;

router.get("/", async (req, res, next) => {
  // Počítadla uživatelů/příspěvků
  const users = (await User.find()).length;

  //Vytvoření/kontrola existence admin účtu
  // Nalezení admin účtu

  const adminAccount = await Admin.findById("660ebae2c0d98cd9c3b0a49c");

  // if (!adminAccount) {
  //   const adminData = {
  //     adminName: "Jakub",
  //   };
  //   Admin.create(adminData);
  // } else {
  //   console.log("vše ok :)");
  // }

  const counterTransfers = adminAccount.valueTransactions.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  res.status(200).render("admin-secret-page", {
    errorMessage: "",
    dnesniDen: dnesniDen,
    dnesniDatum: dnesniDatum,
    counterUsers: users,
    counterTransfers: counterTransfers,
  });
});

module.exports = router;
