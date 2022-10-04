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
    // Ochrana před nepovoleným emailem
    //let email = req.body.email;
    const email = req.body.email;
    const facebook = req.body.facebook;
    const linkedin = req.body.linkedin;
    const github = req.body.github;
    const job = req.body.job;
    const position = req.body.position;
    const region = req.body.region;
    const hex = req.body.hex;

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
        email: email || req.session.user.email,
        facebook: facebook || req.session.user.facebook,
        linkedin: linkedin || req.session.user.linkedin,
        github: github || req.session.user.github,
        job: job || req.session.user.job,
        position: position || req.session.user.position,
        region: region || req.session.user.region,
        hex: hex || req.session.user.hex,
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
