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
    const isNotification = req.body.isNotification;
    const facebook = req.body.facebook;
    const linkedin = req.body.linkedin;
    const instagram = req.body.instagram;
    const faculty = req.body.faculty;
    const fieldOfStudy = req.body.fieldOfStudy;
    const region = req.body.region;

    const updatedUser = await User.findByIdAndUpdate(
      req.session.user._id,
      {
        name: name,
        isNotification: isNotification,
        facebook: facebook,
        linkedin: linkedin,
        instagram: instagram,
        faculty: faculty,
        fieldOfStudy: fieldOfStudy,
        region: region,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    req.session.user = updatedUser;
    res.status(201).send({
      userLoggedIn: req.session.user,
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
