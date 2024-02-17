const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Admin = require("../../schemas/AdminSchema");
const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");

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
  const posts = (await Post.find()).length;

  //Vytvoření/kontrola existence admin účtu
  // Nalezení admin účtu

  const adminAccount = await Admin.findById("659e9fd6213e43b164a1ef3b");

  // if (!adminAccount) {
  //   const adminData = {
  //     adminName: "Jakub",
  //   };
  //   Admin.create(adminData);
  // } else {

  // }

  const counterTransfers = adminAccount.valueTransactions.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const counterFollowersCounter = adminAccount.dateNewFollowersCounter;
  const counterLoginsCounter = adminAccount.dateNewLoginsCounter;
  console.log(counterTransfers);
  console.log(adminAccount.valueTransactions);

  res.status(200).render("admin-secret-page", {
    errorMessage: "",
    dnesniDen: dnesniDen,
    dnesniDatum: dnesniDatum,
    counterUsers: users,
    counterPosts: posts,
    counterTransfers: counterTransfers,
    counterFollowers: counterFollowersCounter,
    counterLogins: counterLoginsCounter,
  });
});

// cron.schedule("00 00 * * *", async () => {
//   console.log("Running a task every midnight (1:00 am)");
//   const usersCounter = (await User.find()).length;
//   const postsCounter = (await Post.find()).length;
//   console.log(postsCounter);
//   console.log(usersCounter);
//   const today = new Date();
//   const timeNow = today.getTime();
//   let data;
//   //Admin.create(data);

module.exports = router;

// const AdminBro = require("admin-bro");
// const AdminBroExpress = require("admin-bro-expressjs");
// const AdminBroMongoose = require("admin-bro-mongoose");

// const mongoose = require("mongoose");

// AdminBro.registerAdapter(AdminBroMongoose);

// const adminBro = new AdminBro({
//   databases: [mongoose],
//   rootPath: "/admin",
// });

// const ADMIN = {
//   email: process.env.ADMIN_EMAIL || "admin@example.com",
//   password: process.env.ADMIN_PASSWORD || "lovejs",
// };

// const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
//   cookieName: process.env.ADMIN_COOKIE_NAME || "admin-bro",
//   cookiePassword:
//     process.env.ADMIN_COOKIE_PASS ||
//     "supersecret-and-long-password-for-a-cookie-in-the-browser",
//   authenticate: async (email, password) => {
//     if (email === ADMIN.email && password === ADMIN.password) {
//       return ADMIN;
//     }
//     return null;
//   },
// });

// module.exports = router;
