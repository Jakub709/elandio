const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const compression = require("compression");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./database");
const session = require("express-session");
const middleware = require("./utils/requireLogin");
const User = require("./schemas/UserSchema");
const cors = require("cors");

// CORS - kvůli funkčnosti socket.io
app.use(cors());
//app.use(cors({ origin: "https://www.ilandio.cz" }));
app.options("*", cors());

const server = app.listen(port, () =>
  console.log("Server listening on port " + port)
);

const io = require("socket.io")(server, { pingTimeout: 60000 });

app.set("view engine", "ejs");
app.set("views", "views");

// Admin page Bro
// const adminRoutes = require("./routes/admin/adminRoutes");
// app.use("/admin", adminRoutes);

// app.use(express.json()) zde mám kvůli adminu
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false,
  })
);

// compression for text only, not images
app.use(compression());

// Index
app.get("/", async (req, res, next) => {
  const users = (await User.find()).length + 22;
  res.status(200).render("index", {
    counter: users,
  });
});

// Admin
const adminRoutes = require("./routes/admin/adminRoutes");
app.use("/admin-secret-page", adminRoutes);

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
app.get("/after-reg", async (req, res, next) => {
  res.status(200).render("after-reg");
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

// Posts
const postsSearchRoutes = require("./routes/posts/postsSearchRoutes");
const postDeleteRoutes = require("./routes/posts/postDeleteRoutes");
const postsListRoutes = require("./routes/posts/postsListRoutes");
const myPostsRoutes = require("./routes/posts/myPostsRoutes");
const postsListFollowing = require("./routes/posts/postsListFollowing");

app.use("/posts-search", middleware.requireLogin, postsSearchRoutes);
app.use("/my-posts", middleware.requireLogin, myPostsRoutes);
app.use("/post-delete", middleware.requireLogin, postDeleteRoutes);
app.use("/posts-list", middleware.requireLogin, postsListRoutes);
app.use("/posts-list-following", middleware.requireLogin, postsListFollowing);

// Users
const usersSearchRoutes = require("./routes/users/usersSearchRoutes");
const usersListRoutes = require("./routes/users/usersListRoutes");
const usersListMapDataRoutes = require("./routes/users/usersListMapDataRoutes");
const userProfileRoutes = require("./routes/users/userProfileRoutes");
const followRoutes = require("./routes/users/followRoutes");
const unFollowRoutes = require("./routes/users/unFollowRoutes");
const userProfileUsernameRoutes = require("./routes/users/userProfileUsernameRoutes");

app.use("/users-search", middleware.requireLogin, usersSearchRoutes);
app.use("/users-list", middleware.requireLogin, usersListRoutes);
app.get("/users-list-map", middleware.requireLogin, async (req, res, next) => {
  res.status(200).render("map");
});
app.use(
  "/users-list-map-data",
  middleware.requireLogin,
  usersListMapDataRoutes
);
app.use("/user-profile", middleware.requireLogin, userProfileRoutes);
app.use("/follow", middleware.requireLogin, followRoutes);
app.use("/unfollow", middleware.requireLogin, unFollowRoutes);
app.use(
  "/user-profile-username",
  middleware.requireLogin,
  userProfileUsernameRoutes
);

// Bank
const transferRoute = require("./routes/bank/transferRoutes");

app.use("/transfer", middleware.requireLogin, transferRoute);
app.get("/bank", middleware.requireLogin, async (req, res, next) => {
  const users = (await User.find()).length;
  res.status(200).render("bank", {
    counter: users,
  });
});

// My profile
const myProfile = require("./routes/myProfile/myProfile");
const myProfileUpdate = require("./routes/myProfile/myProfileUpdate");
const myProfileUpdateMain = require("./routes/myProfile/myProfileUpdateMain");
const myProfileUpdatePassword = require("./routes/myProfile/myProfileUpdatePassword");
const myProfileUpdateAbout = require("./routes/myProfile/myProfileUpdateAbout");
const myProfileWatch = require("./routes/myProfile/myProfileWatchRoutes");
const myProfileUploadPhoto = require("./routes/myProfile/myProfileUploadPhoto");

app.use("/my-profile", middleware.requireLogin, myProfile);
app.use("/my-profile-update", middleware.requireLogin, myProfileUpdate);
app.use(
  "/my-profile-update-main",
  middleware.requireLogin,
  myProfileUpdateMain
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

app.use("/my-profile-watch", middleware.requireLogin, myProfileWatch);
app.use("/uploads", middleware.requireLogin, myProfileUploadPhoto);

// Messages
const messagesRoute = require("./routes/messages/messagesRoutes");

const usersApiRoute = require("./routes/messages/users");
const chatsApiRoute = require("./routes/messages/chats");
const messagesApiRoute = require("./routes/messages/messages");

app.use("/messages", middleware.requireLogin, messagesRoute);
app.use("/api/users", middleware.requireLogin, usersApiRoute);
app.use("/api/chats", middleware.requireLogin, chatsApiRoute);
app.use("/api/messages", middleware.requireLogin, messagesApiRoute);

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join room", (room) => socket.join(room));
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("notification received", (room) =>
    socket.in(room).emit("notification received")
  );

  socket.on("new message", (newMessage) => {
    var chat = newMessage.chat;

    if (!chat.users) return console.log("Chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) return;
      socket.in(user._id).emit("message received", newMessage);
    });
  });
});
