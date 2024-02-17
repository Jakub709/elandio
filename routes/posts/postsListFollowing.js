const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Post = require("../../schemas/PostSchema");
const User = require("../../schemas/UserSchema");
const APIFeatures = require("../../utils/apiFeatures");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    // 2) Execute query
    //const start = Date.now();
    const followingArray = req.session.user.following;
    // const query = await Post.find({
    //   postedByID: { $in: followingArray },
    // });
    // const postsCounter = Math.ceil(query.length / 10);
    // const postsCounterLimited = postsCounter >= 10 ? 10 : postsCounter;
    // console.log("Followers");
    // console.log(query.length);
    // console.log(postsCounterLimited);
    const features = new APIFeatures(
      Post.find({
        postedByID: { $in: followingArray },
      }).populate("postedBy"),
      req.query
    )
      .filter()
      .sort()
      .paginate();

    const posts = await features.query;

    const postsCounter = posts.length;
    const currentPage = req.query.page ? Number(req.query.page) : 1;
    const textNext = postsCounter == 10 ? "Následující →" : "";
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
    // const faculty = req.session.user.faculty;
    // let color;
    // if (faculty === "ESF MU") {
    //   color = "#C50069";
    // } else if (faculty === "FaF MU") {
    //   color = "#527488";
    // } else if (faculty === "FF MU") {
    //   color = "#5CB4E1";
    // } else if (faculty === "FI MU") {
    //   color = "#F8DA08";
    // } else if (faculty === "FSpS MU") {
    //   color = "#74B8AA";
    // } else if (faculty === "FSS MU") {
    //   color = "#3D885A";
    // } else if (faculty === "LF MU") {
    //   color = "#C62326";
    // } else if (faculty === "PdF MU") {
    //   color = "#CE661D";
    // } else if (faculty === "PrF MU") {
    //   color = "#8F448E";
    // } else if (faculty === "PřF MU") {
    //   color = "#5AA353";
    // } else {
    //   color = "#1165BF";
    // }
    res.status(200).render("posts-list", {
      posts: posts,
      postsCounter: postsCounter,
      currentPage: currentPage,
      textNext: textNext,
      textPrevious: textPrevious,
      url: url,
      user: req.session.user,
    });
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
