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

  // Zjištění bankéře
  if (req.body.logUsername == "banker" && req.body.logPassword) {
    const user = await User.findOne({
      $or: [{ username: "banker" }],
    }).catch((error) => {
      console.log(error);
      payload.errorMessage = "⚠ Něco se pokazilo. Zkuste to prosím znovu :-).";
      res.status(200).render("login", payload);
    });

    if (user != null) {
      const result = await bcrypt.compare(req.body.logPassword, user.password);

      if (result === true) {
        req.session.user = user;

        return res.redirect("/admin-secret-page");
      }
    }

    payload.errorMessage = "⚠ Údaje nejsou správné.";
    return res.status(200).render("login", payload);
  } else {
    // Běžný uživatel
    if (req.body.logUsername && req.body.logPassword) {
      const user = await User.findOne({
        $or: [
          { username: req.body.logUsername },
          { email: req.body.logUsername },
        ],
      }).catch((error) => {
        console.log(error);
        payload.errorMessage =
          "⚠ Něco se pokazilo. Zkuste to prosím znovu :-).";
        res.status(200).render("login", payload);
      });

      if (user != null) {
        const result = await bcrypt.compare(
          req.body.logPassword,
          user.password
        );

        if (result === true) {
          req.session.user = user;

          return res.redirect("/bank");
        }
      }

      payload.errorMessage = "⚠ Údaje nejsou správné.";
      return res.status(200).render("login", payload);
    }
  }
});

module.exports = router;
