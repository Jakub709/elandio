const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../../schemas/UserSchema");
const Admin = require("../../schemas/AdminSchema");

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

        //admin data
        const start = Date.now();

        if (req.session.user._id != "63eca6feed37d2be3e5d1b2d") {
          console.log(req.session.user._id);
          const adminData = await Admin.findByIdAndUpdate(
            "659e9fd6213e43b164a1ef3b",
            {
              $push: {
                dateNewLogins: new Date(),
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        } else {
          console.log("Jakub se hlásí.");
        }

        const millis = Date.now() - start;
        console.log("TEST RYCHLOSTI");
        console.log(millis);
        // & je zde kvůli: const url = req.originalUrl.split("&page")[0]; postsListRoutes; postsSearchRoutes; postsListFollowing;

        //return res.redirect("/posts-list?&page=1");
        return res.redirect("/after-login");
      }
    }

    payload.errorMessage = "⚠ Údaje nejsou správné.";
    return res.status(200).render("login", payload);
  }

  payload.errorMessage = "⚠ Ujistěte se, zda-li jsou údaje správné.";
  res.status(200).render("login");
});

module.exports = router;
