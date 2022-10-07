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
    const instagram = req.body.instagram;
    const faculty = req.body.faculty;
    const fieldOfStudy = req.body.fieldOfStudy;
    const region = req.body.region;
    const hex = req.body.hex;

    // Ochrana před nepovoleným emailem
    const emailDomena = email.split("@").pop();
    const seznamDomen = [
      "seznam.cz",
      "mail.muni.cz",
      "gmail.com",
      "elandio.cz",
    ];
    if (!seznamDomen.includes(emailDomena)) {
      email = req.session.user.email;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.session.user._id,
      {
        name: name || req.session.user.name,
        email: email || req.session.user.email,
        facebook: facebook || req.session.user.facebook,
        linkedin: linkedin || req.session.user.linkedin,
        instagram: instagram || req.session.user.instagram,
        faculty: faculty || req.session.user.faculty,
        fieldOfStudy: fieldOfStudy || req.session.user.fieldOfStudy,
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
