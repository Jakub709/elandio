const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res, next) => {
  try {
    //const clickedUserID = req.params.id;
    //const userProfile = await User.findById(clickedUserID);
    const data = {
      nazdar: "nazdar",
    };
    res.status(200).send(nazdar);
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
