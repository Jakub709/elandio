const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../../schemas/UserSchema");

app.use(bodyParser.urlencoded({ extended: false }));

// Stránka s přihlášením
router.get("/", async (req, res, next) => {
  res.status(200).render("login", {
    errorMessage: "",
  });
});

// Přihlašování
router.post("/", async (req, res, next) => {
  const payload = req.body;
  payload.counter = "";

  if (req.body.logUsername && req.body.logPassword) {
    const user = await User.findOne({
      $or: [
        { username: req.body.logUsername },
        { email: req.body.logUsername },
      ],
    }).catch((error) => {
      console.log(error);
      payload.errorMessage = "⚠ Něco se pokazilo. Zkuste to prosím znovu :-).";
      res.status(200).render("login", payload);
    });

    if (user != null) {
      const result = await bcrypt.compare(req.body.logPassword, user.password);

      if (result === true) {
        req.session.user = user;
        // & je zde kvůli: const url = req.originalUrl.split("&page")[0]; postsListRoutes; postsSearchRoutes; postsListFollowing;
        return res.redirect("/posts-list?&page=1");
        //return res.redirect("/users-list-map");
      }
    }

    payload.errorMessage = "⚠ Údaje nejsou správné.";
    return res.status(200).render("login", payload);
  }

  payload.errorMessage = "⚠ Ujistěte se, zda-li jsou údaje správné.";
  res.status(200).render("login");
});

module.exports = router;
