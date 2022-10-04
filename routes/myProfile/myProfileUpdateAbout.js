const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.post("/", async (req, res) => {
  try {
    // Data z ajaxu
    const about = req.body.about;
    const locationLatitude = req.body.locationLatitude;
    const locationLongitude = req.body.locationLongitude;

    const updatedUser = await User.findByIdAndUpdate(
      req.session.user._id,
      {
        about: about || req.session.user.about,
        locationLatitude: locationLatitude || req.session.user.locationLatitude,
        locationLongitude:
          locationLongitude || req.session.user.locationLongitude,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    req.session.user = updatedUser;
    res.status(201).send({
      userLoggedIn: updatedUser,
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
