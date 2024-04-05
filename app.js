const express = require("express");
const app = express();
const port = process.env.PORT || 3012;
const compression = require("compression");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./database");
const session = require("express-session");
const middleware = require("./utils/requireLogin");
const middlewareBanker = require("./utils/isBanker");

const User = require("./schemas/UserSchema");
const cors = require("cors");

// CORS - kvůli funkčnosti socket.io
app.use(cors());
//app.use(cors({ origin: "https://www.ilandio.cz" }));
app.options("*", cors());

const server = app.listen(port, () =>
  console.log("Server poslouchá na portu " + port)
);

const io = require("socket.io")(server, { pingTimeout: 60000 });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.GMAILISNOTIFICATIONPASSWORD,
    cookie: { maxAge: 604800000 },
    resave: true,
    saveUninitialized: false,
  })
);

// compression for text only, not images
app.use(compression());

// Index
app.get("/", async (req, res, next) => {
  const users = (await User.find()).length;
  res.status(200).render("index", {
    counter: users,
  });
});

// Admin
const adminRoutes = require("./routes/admin/adminRoutes");
const adminDataRoutes = require("./routes/admin/adminDataRoutes");
app.use(
  "/admin-secret-page",
  middleware.requireLogin,
  middlewareBanker.isBanker,
  adminRoutes
);
app.use(
  "/admin-data",
  middleware.requireLogin,
  middlewareBanker.isBanker,
  adminDataRoutes
);

// Error
app.get("/error", async (req, res, next) => {
  res.status(200).render("error");
});

// Authentication
const loginRoutes = require("./routes/authentication/loginRoutes");
const registerRoutes = require("./routes/authentication/registerRoutes");
const accountConfirmedRoutes = require("./routes/authentication/accountConfirmedRoutes");
const logoutRoutes = require("./routes/authentication/logout");
const resetPassRoutes = require("./routes/authentication/resetPassRoutes");
const resetPassEmailRoutes = require("./routes/authentication/resetPassEmailRoutes");

app.use("/login", middleware.isLoggedIN, loginRoutes);
app.use("/register", middleware.isLoggedIN, registerRoutes);
app.use("/account-confirmed", accountConfirmedRoutes);

app.get("/after-login", middleware.requireLogin, async (req, res, next) => {
  const users = (await User.find()).length;
  res.status(200).render("after-login", {
    counter: users,
  });
});
app.get("/kontakt", async (req, res, next) => {
  res.status(200).render("kontakt");
});
app.get("/gdpr", async (req, res, next) => {
  res.status(200).render("gdpr");
});
app.use("/logout", logoutRoutes);
app.get("/logout-page", async (req, res, next) => {
  res.status(200).render("logout-page");
});

app.use("/reset-pass", resetPassRoutes);
app.use("/reset-pass-email", resetPassEmailRoutes);

// Users
const usersSearchRoutes = require("./routes/users/usersSearchRoutes");
const usersListRoutes = require("./routes/users/usersListRoutes");
const userProfileRoutes = require("./routes/users/userProfileRoutes");

const userProfileUsernameRoutes = require("./routes/users/userProfileUsernameRoutes");

app.use(
  "/users-search",
  middleware.requireLogin,
  middlewareBanker.isBanker,
  usersSearchRoutes
);
app.use(
  "/users-list",
  middleware.requireLogin,
  middlewareBanker.isBanker,
  usersListRoutes
);

app.use(
  "/user-profile",
  middleware.requireLogin,
  middlewareBanker.isBanker,
  userProfileRoutes
);

app.use(
  "/user-profile-username",
  middleware.requireLogin,
  middlewareBanker.isBanker,
  userProfileUsernameRoutes
);

// Bank
const transferRoutes = require("./routes/bank/transferRoutes");
const transactionsListRoutes = require("./routes/bank/transactionsListRoutes");
const transactionsUserRoutes = require("./routes/bank/transactionsUserRoutes");

app.use("/transfer", middleware.requireLogin, transferRoutes);
app.use("/transactions", middleware.requireLogin, transactionsListRoutes);
app.use("/transactionsUser", middleware.requireLogin, transactionsUserRoutes);
app.get("/bank", middleware.requireLogin, async (req, res, next) => {
  const users = (await User.find()).length;
  res.status(200).render("bank", {
    counter: users,
  });
});

app.get(
  "/transactions-list",
  middleware.requireLogin,
  async (req, res, next) => {
    const users = (await User.find()).length;
    res.status(200).render("transactions-list");
  }
);

// My profile
const myProfile = require("./routes/myProfile/myProfile");
const myProfileUpdate = require("./routes/myProfile/myProfileUpdate");
const myProfileUpdateGeneral = require("./routes/myProfile/myProfileUpdateGeneral");
const myProfileUpdatePassword = require("./routes/myProfile/myProfileUpdatePassword");
const myProfileUpdateAbout = require("./routes/myProfile/myProfileUpdateAbout");

const myProfileUploadPhoto = require("./routes/myProfile/myProfileUploadPhoto");

app.use("/my-profile", middleware.requireLogin, myProfile);
app.use("/my-profile-update", middleware.requireLogin, myProfileUpdate);
app.use(
  "/my-profile-update-general",
  middleware.requireLogin,
  myProfileUpdateGeneral
);
app.use(
  "/my-profile-update-about",
  middleware.requireLogin,
  myProfileUpdateAbout
);
app.use(
  "/my-profile-update-password",
  middleware.requireLogin,
  myProfileUpdatePassword
);

app.use("/uploads", middleware.requireLogin, myProfileUploadPhoto);
