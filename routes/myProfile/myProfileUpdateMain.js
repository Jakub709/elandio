const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.post("/", async (req, res) => {
  try {
    // Data z ajaxu
    const name = req.body.name;

    const region = req.body.region;

    // Ochrana před nepovoleným emailem
    // const emailDomena = email.split("@").pop();
    // const seznamDomen = [
    //   "seznam.cz",
    //   "mail.muni.cz",
    //   "gmail.com",
    //   "ilandio.cz",
    // ];
    // if (!seznamDomen.includes(emailDomena)) {
    //   email = req.session.user.email;
    // }

    const updatedUser = await User.findByIdAndUpdate(
      req.session.user._id,
      {
        name: name || req.session.user.name,

        region: region || req.session.user.region,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    req.session.user = updatedUser;
    res.status(201).send({
      userLoggedIn: updatedUser,
      errorMessage: "",
      status: "success",
    });
  } catch (err) {
    res.status(404).send({
      userLoggedIn: req.session.user,
      errorMessage: "Něco se pokazilo :-(",
      status: "fail",
    });
  }
});

module.exports = router;
