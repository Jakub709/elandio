const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Admin = require("../../schemas/AdminSchema");
const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");

const cron = require("node-cron");

// app.use(express.json()) zde mám kvůli adminu
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//const todayDate = new Date().toISOString().substring(0, 10);

router.get("/", async (req, res, next) => {
  res.status(200).render("admin-secret-page", {
    errorMessage: "",
  });
});

cron.schedule("00 00 * * *", async () => {
  console.log("Running a task every midnight (1:00 am)");
  const usersCounter = (await User.find()).length;
  const postsCounter = (await Post.find()).length;
  console.log(postsCounter);
  console.log(usersCounter);
  const today = new Date();
  const timeNow = today.getTime();
  let data;
  //Admin.create(data);
  const updateDatabase = await Admin.findByIdAndUpdate(
    "6363b8bcce2dcdbd6f4b72dd",
    {
      $push: {
        users: usersCounter,
        posts: postsCounter,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  //console.log(updateDatabase);
});

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
