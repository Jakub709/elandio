const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");
const APIFeatures = require("../../utils/apiFeatures");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    // 2) Execute query
    //const start = Date.now();
    //const query = await User.find();
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .paginate();

    const users = await features.query;

    const usersCounter = users.length;
    const currentPage = req.query.page ? Number(req.query.page) : 1;
    const textNext = usersCounter == 10 ? "Následující →" : "";
    const textPrevious =
      req.originalUrl.includes("page=1") || !req.originalUrl.includes("page=")
        ? ""
        : "← Předchozí";
    let url = req.originalUrl.split("&page")[0];
    const checkFilter = url.includes("?");
    if (!checkFilter) {
      url = url + "?";
    }

    // const millis = Date.now() - start;
    // console.log(millis);
    res.status(200).render("users-list", {
      users: users,
      usersCounter: usersCounter,
      currentPage: currentPage,
      textNext: textNext,
      textPrevious: textPrevious,
      url: url,
    });
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
